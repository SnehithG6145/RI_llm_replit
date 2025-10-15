import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User roles: customer (layperson), researcher, admin
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role", { length: 20 }).notNull().default('customer'), // customer, researcher, admin
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = Omit<typeof users.$inferSelect, 'password'>;
export type LoginCredentials = z.infer<typeof loginSchema>;

// Admin-created tags for categorization
export const tags = pgTable("tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: varchar("created_by").references(() => users.id),
});

export const insertTagSchema = createInsertSchema(tags).omit({
  id: true,
  createdAt: true,
});

export type InsertTag = z.infer<typeof insertTagSchema>;
export type Tag = typeof tags.$inferSelect;

// Infographics with multi-section structure
// Section A: Overview (title, sources, statistics, conclusions)
// Section B: Methods (methodology, participants, technical details)
// Section C: Solutions (3-5 pages of actionable steps for laypeople)
export const infographics = pgTable("infographics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  researcherId: varchar("researcher_id").notNull().references(() => users.id),
  status: varchar("status", { length: 20 }).notNull().default('pending'), // pending, approved, rejected
  
  // Infographic content sections (stored as JSON)
  sectionA: jsonb("section_a").notNull(), // { title, summary, statistics, sources, conclusions }
  sectionB: jsonb("section_b").notNull(), // { methodology, participants, technicalTerms, studyDesign }
  sectionC: jsonb("section_c").notNull(), // Array of solution pages: [{ title, steps, badge }]
  
  // Metadata
  originalPaperText: text("original_paper_text"), // Store for reference
  researcherNotes: text("researcher_notes"), // Context from questionnaire
  
  // Admin review
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  reviewedAt: timestamp("reviewed_at"),
  rejectionReason: text("rejection_reason"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertInfographicSchema = createInsertSchema(infographics).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reviewedAt: true,
});

export type InsertInfographic = z.infer<typeof insertInfographicSchema>;
export type Infographic = typeof infographics.$inferSelect;

// Many-to-many: infographics to tags
export const infographicTags = pgTable(
  "infographic_tags",
  {
    infographicId: varchar("infographic_id").notNull().references(() => infographics.id, { onDelete: 'cascade' }),
    tagId: varchar("tag_id").notNull().references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.infographicId, table.tagId] }),
  })
);

export const insertInfographicTagSchema = createInsertSchema(infographicTags);
export type InsertInfographicTag = z.infer<typeof insertInfographicTagSchema>;
export type InfographicTag = typeof infographicTags.$inferSelect;

// User preferences for personalized feed
export const userTagPreferences = pgTable(
  "user_tag_preferences",
  {
    userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
    tagId: varchar("tag_id").notNull().references(() => tags.id, { onDelete: 'cascade' }),
    addedAt: timestamp("added_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.tagId] }),
  })
);

export const insertUserTagPreferenceSchema = createInsertSchema(userTagPreferences).omit({
  addedAt: true,
});

export type InsertUserTagPreference = z.infer<typeof insertUserTagPreferenceSchema>;
export type UserTagPreference = typeof userTagPreferences.$inferSelect;
