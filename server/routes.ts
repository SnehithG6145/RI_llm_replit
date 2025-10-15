import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, requireRole } from "./simpleAuth";
import { generateInfographicFromText } from "./openai";
import { insertTagSchema, insertInfographicSchema, loginSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // ============= AUTH ROUTES =============
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      (req.session as any).userId = user.id;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user role (admin only)
  app.patch('/api/users/:userId/role', isAuthenticated, requireRole('admin'), async (req: any, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;
      
      if (!['customer', 'researcher', 'admin'].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      
      const user = await storage.updateUserRole(userId, role);
      res.json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  // ============= TAG ROUTES =============
  // Get all tags
  app.get('/api/tags', async (_req, res) => {
    try {
      const tags = await storage.getAllTags();
      res.json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ message: "Failed to fetch tags" });
    }
  });

  // Create tag (admin only)
  app.post('/api/tags', isAuthenticated, requireRole('admin'), async (req: any, res) => {
    try {
      const tagData = insertTagSchema.parse({
        ...req.body,
        createdBy: req.user.id,
      });
      
      const tag = await storage.createTag(tagData);
      res.json(tag);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Error creating tag:", error);
      res.status(500).json({ message: "Failed to create tag" });
    }
  });

  // Delete tag (admin only)
  app.delete('/api/tags/:tagId', isAuthenticated, requireRole('admin'), async (req, res) => {
    try {
      await storage.deleteTag(req.params.tagId);
      res.json({ message: "Tag deleted successfully" });
    } catch (error) {
      console.error("Error deleting tag:", error);
      res.status(500).json({ message: "Failed to delete tag" });
    }
  });

  // ============= INFOGRAPHIC ROUTES =============
  // Get all approved infographics
  app.get('/api/infographics', async (_req, res) => {
    try {
      const infographics = await storage.getApprovedInfographics();
      res.json(infographics);
    } catch (error) {
      console.error("Error fetching infographics:", error);
      res.status(500).json({ message: "Failed to fetch infographics" });
    }
  });

  // Get infographic by ID with tags
  app.get('/api/infographics/:id', async (req, res) => {
    try {
      const infographic = await storage.getInfographicById(req.params.id);
      if (!infographic) {
        return res.status(404).json({ message: "Infographic not found" });
      }
      
      const tags = await storage.getInfographicTags(req.params.id);
      res.json({ ...infographic, tags });
    } catch (error) {
      console.error("Error fetching infographic:", error);
      res.status(500).json({ message: "Failed to fetch infographic" });
    }
  });

  // Get personalized feed
  app.get('/api/infographics/feed/personalized', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const infographics = await storage.getPersonalizedInfographics(userId);
      res.json(infographics);
    } catch (error) {
      console.error("Error fetching personalized feed:", error);
      res.status(500).json({ message: "Failed to fetch personalized feed" });
    }
  });

  // Get infographics by tag IDs
  app.post('/api/infographics/by-tags', async (req, res) => {
    try {
      const { tagIds } = req.body;
      if (!Array.isArray(tagIds)) {
        return res.status(400).json({ message: "tagIds must be an array" });
      }
      
      const infographics = await storage.getInfographicsByTagIds(tagIds);
      res.json(infographics);
    } catch (error) {
      console.error("Error fetching infographics by tags:", error);
      res.status(500).json({ message: "Failed to fetch infographics" });
    }
  });

  // Create infographic (researcher only)
  app.post('/api/infographics', isAuthenticated, requireRole('researcher', 'admin'), async (req: any, res) => {
    try {
      const { researchText, researcherNotes, tagIds } = req.body;
      
      if (!researchText) {
        return res.status(400).json({ message: "Research text is required" });
      }

      // Generate infographic content using AI
      const sections = await generateInfographicFromText(researchText, researcherNotes);
      
      const infographicData = {
        researcherId: req.user.id,
        status: 'pending',
        sectionA: sections.sectionA,
        sectionB: sections.sectionB,
        sectionC: sections.sectionC,
        originalPaperText: researchText,
        researcherNotes: researcherNotes || null,
        reviewedBy: null,
        rejectionReason: null,
      };
      
      const infographic = await storage.createInfographic(infographicData);
      
      // Add tags if provided
      if (Array.isArray(tagIds) && tagIds.length > 0) {
        await storage.addTagsToInfographic(infographic.id, tagIds);
      }
      
      res.json(infographic);
    } catch (error: any) {
      console.error("Error creating infographic:", error);
      res.status(500).json({ message: error.message || "Failed to create infographic" });
    }
  });

  // Get researcher's infographics
  app.get('/api/researcher/infographics', isAuthenticated, requireRole('researcher', 'admin'), async (req: any, res) => {
    try {
      const infographics = await storage.getInfographicsByResearcher(req.user.id);
      res.json(infographics);
    } catch (error) {
      console.error("Error fetching researcher infographics:", error);
      res.status(500).json({ message: "Failed to fetch infographics" });
    }
  });

  // ============= ADMIN ROUTES =============
  // Get pending infographics for verification
  app.get('/api/admin/infographics/pending', isAuthenticated, requireRole('admin'), async (_req, res) => {
    try {
      const infographics = await storage.getInfographicsByStatus('pending');
      res.json(infographics);
    } catch (error) {
      console.error("Error fetching pending infographics:", error);
      res.status(500).json({ message: "Failed to fetch pending infographics" });
    }
  });

  // Approve/reject infographic
  app.patch('/api/admin/infographics/:id/review', isAuthenticated, requireRole('admin'), async (req: any, res) => {
    try {
      const { id } = req.params;
      const { status, rejectionReason } = req.body;
      
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: "Status must be 'approved' or 'rejected'" });
      }
      
      if (status === 'rejected' && !rejectionReason) {
        return res.status(400).json({ message: "Rejection reason is required" });
      }
      
      const infographic = await storage.updateInfographicStatus(
        id,
        status,
        req.user.id,
        rejectionReason
      );
      
      res.json(infographic);
    } catch (error) {
      console.error("Error reviewing infographic:", error);
      res.status(500).json({ message: "Failed to review infographic" });
    }
  });

  // ============= USER PREFERENCE ROUTES =============
  // Get user's tag preferences
  app.get('/api/user/tags', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tags = await storage.getUserTagPreferences(userId);
      res.json(tags);
    } catch (error) {
      console.error("Error fetching user tags:", error);
      res.status(500).json({ message: "Failed to fetch user tags" });
    }
  });

  // Add tag preference
  app.post('/api/user/tags/:tagId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.addUserTagPreference(userId, req.params.tagId);
      res.json({ message: "Tag preference added" });
    } catch (error) {
      console.error("Error adding tag preference:", error);
      res.status(500).json({ message: "Failed to add tag preference" });
    }
  });

  // Remove tag preference
  app.delete('/api/user/tags/:tagId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.removeUserTagPreference(userId, req.params.tagId);
      res.json({ message: "Tag preference removed" });
    } catch (error) {
      console.error("Error removing tag preference:", error);
      res.status(500).json({ message: "Failed to remove tag preference" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
