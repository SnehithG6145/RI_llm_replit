import {
  users,
  tags,
  infographics,
  infographicTags,
  userTagPreferences,
  type User,
  type InsertUser,
  type Tag,
  type InsertTag,
  type Infographic,
  type InsertInfographic,
  type InsertInfographicTag,
  type InsertUserTagPreference,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, inArray, desc, sql } from "drizzle-orm";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<(User & { password: string }) | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserRole(userId: string, role: string): Promise<User | undefined>;
  
  // Tag operations
  getAllTags(): Promise<Tag[]>;
  getTagById(id: string): Promise<Tag | undefined>;
  createTag(tag: InsertTag): Promise<Tag>;
  deleteTag(id: string): Promise<void>;
  
  // Infographic operations
  getInfographicById(id: string): Promise<Infographic | undefined>;
  getInfographicsByStatus(status: string): Promise<Infographic[]>;
  getApprovedInfographics(): Promise<Infographic[]>;
  getInfographicsByResearcher(researcherId: string): Promise<Infographic[]>;
  createInfographic(infographic: InsertInfographic): Promise<Infographic>;
  updateInfographicStatus(id: string, status: string, reviewedBy: string, rejectionReason?: string): Promise<Infographic | undefined>;
  
  // Infographic-Tag associations
  addTagsToInfographic(infographicId: string, tagIds: string[]): Promise<void>;
  getInfographicTags(infographicId: string): Promise<Tag[]>;
  getInfographicsByTagIds(tagIds: string[]): Promise<Infographic[]>;
  
  // User tag preferences
  getUserTagPreferences(userId: string): Promise<Tag[]>;
  addUserTagPreference(userId: string, tagId: string): Promise<void>;
  removeUserTagPreference(userId: string, tagId: string): Promise<void>;
  getPersonalizedInfographics(userId: string): Promise<Infographic[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db.select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      profileImageUrl: users.profileImageUrl,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    }).from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<(User & { password: string }) | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user as any;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  async updateUserRole(userId: string, role: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Tag operations
  async getAllTags(): Promise<Tag[]> {
    return await db.select().from(tags).orderBy(tags.name);
  }

  async getTagById(id: string): Promise<Tag | undefined> {
    const [tag] = await db.select().from(tags).where(eq(tags.id, id));
    return tag;
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const [newTag] = await db.insert(tags).values(tag).returning();
    return newTag;
  }

  async deleteTag(id: string): Promise<void> {
    await db.delete(tags).where(eq(tags.id, id));
  }

  // Infographic operations
  async getInfographicById(id: string): Promise<Infographic | undefined> {
    const [infographic] = await db.select().from(infographics).where(eq(infographics.id, id));
    return infographic;
  }

  async getInfographicsByStatus(status: string): Promise<Infographic[]> {
    return await db
      .select()
      .from(infographics)
      .where(eq(infographics.status, status))
      .orderBy(desc(infographics.createdAt));
  }

  async getApprovedInfographics(): Promise<Infographic[]> {
    return await db
      .select()
      .from(infographics)
      .where(eq(infographics.status, 'approved'))
      .orderBy(desc(infographics.createdAt));
  }

  async getInfographicsByResearcher(researcherId: string): Promise<Infographic[]> {
    return await db
      .select()
      .from(infographics)
      .where(eq(infographics.researcherId, researcherId))
      .orderBy(desc(infographics.createdAt));
  }

  async createInfographic(infographic: InsertInfographic): Promise<Infographic> {
    const [newInfographic] = await db.insert(infographics).values(infographic).returning();
    return newInfographic;
  }

  async updateInfographicStatus(
    id: string,
    status: string,
    reviewedBy: string,
    rejectionReason?: string
  ): Promise<Infographic | undefined> {
    const [updated] = await db
      .update(infographics)
      .set({
        status,
        reviewedBy,
        reviewedAt: new Date(),
        rejectionReason: rejectionReason || null,
        updatedAt: new Date(),
      })
      .where(eq(infographics.id, id))
      .returning();
    return updated;
  }

  // Infographic-Tag associations
  async addTagsToInfographic(infographicId: string, tagIds: string[]): Promise<void> {
    if (tagIds.length === 0) return;
    
    const values = tagIds.map(tagId => ({
      infographicId,
      tagId,
    }));
    
    await db.insert(infographicTags).values(values).onConflictDoNothing();
  }

  async getInfographicTags(infographicId: string): Promise<Tag[]> {
    const result = await db
      .select({
        id: tags.id,
        name: tags.name,
        description: tags.description,
        createdAt: tags.createdAt,
        createdBy: tags.createdBy,
      })
      .from(infographicTags)
      .innerJoin(tags, eq(infographicTags.tagId, tags.id))
      .where(eq(infographicTags.infographicId, infographicId));
    
    return result;
  }

  async getInfographicsByTagIds(tagIds: string[]): Promise<Infographic[]> {
    if (tagIds.length === 0) return await this.getApprovedInfographics();
    
    const result = await db
      .select({
        infographic: infographics,
      })
      .from(infographicTags)
      .innerJoin(infographics, eq(infographicTags.infographicId, infographics.id))
      .where(
        and(
          inArray(infographicTags.tagId, tagIds),
          eq(infographics.status, 'approved')
        )
      )
      .orderBy(desc(infographics.createdAt));
    
    return result.map(r => r.infographic);
  }

  // User tag preferences
  async getUserTagPreferences(userId: string): Promise<Tag[]> {
    const result = await db
      .select({
        id: tags.id,
        name: tags.name,
        description: tags.description,
        createdAt: tags.createdAt,
        createdBy: tags.createdBy,
      })
      .from(userTagPreferences)
      .innerJoin(tags, eq(userTagPreferences.tagId, tags.id))
      .where(eq(userTagPreferences.userId, userId));
    
    return result;
  }

  async addUserTagPreference(userId: string, tagId: string): Promise<void> {
    await db
      .insert(userTagPreferences)
      .values({ userId, tagId })
      .onConflictDoNothing();
  }

  async removeUserTagPreference(userId: string, tagId: string): Promise<void> {
    await db
      .delete(userTagPreferences)
      .where(
        and(
          eq(userTagPreferences.userId, userId),
          eq(userTagPreferences.tagId, tagId)
        )
      );
  }

  async getPersonalizedInfographics(userId: string): Promise<Infographic[]> {
    const userTags = await this.getUserTagPreferences(userId);
    const tagIds = userTags.map(tag => tag.id);
    
    if (tagIds.length === 0) {
      // If no preferences, return all approved infographics
      return await this.getApprovedInfographics();
    }
    
    return await this.getInfographicsByTagIds(tagIds);
  }
}

export const storage = new DatabaseStorage();
