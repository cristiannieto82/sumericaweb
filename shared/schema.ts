import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  code: text("code"),
  // Technical specifications
  specifications: jsonb("specifications"), // Technical specs object
  dimensions: jsonb("dimensions"), // Dimensions and weight
  materials: text("materials").array(), // Construction materials array
  certifications: text("certifications").array(), // Safety certifications
  applications: text("applications").array(), // Recommended uses
  features: text("features").array(), // Key features/benefits
  warranty: text("warranty"), // Warranty information
  installationGuide: text("installation_guide"), // Installation instructions
  dataSheetUrl: text("data_sheet_url"), // URL to PDF datasheet
  // Additional product info
  model: text("model"), // Model number
  series: text("series"), // Product series
  availability: text("availability").default("available"), // Stock status
  priceCents: integer("price_cents"), // Price in cents (null = quote only)
  currency: text("currency").default("CLP"), // Currency code
  pricingModel: text("pricing_model").default("quote"), // 'quote' | 'fixed'
  minOrderQuantity: integer("min_order_quantity").default(1),
});

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone").notNull(),
  products: jsonb("products").notNull(), // Array of {productId, quantity, unitPriceCents?, notes?}
  customerMessage: text("customer_message"), // Optional customer requirements/notes
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas for structured JSON fields
export const dimensionsSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  depth: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  unit: z.enum(['mm', 'cm', 'in', 'm']).default('cm'),
  weightUnit: z.enum(['kg', 'lb', 'g']).default('kg'),
});

export const specificationsSchema = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]));

export const quoteItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  unitPriceCents: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
}).extend({
  specifications: specificationsSchema.optional(),
  dimensions: dimensionsSchema.optional(),
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  products: z.array(quoteItemSchema),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type Dimensions = z.infer<typeof dimensionsSchema>;
export type Specifications = z.infer<typeof specificationsSchema>;
export type QuoteItem = z.infer<typeof quoteItemSchema>;

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
