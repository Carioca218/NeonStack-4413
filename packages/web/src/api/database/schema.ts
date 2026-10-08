import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/** Briefings enviados pelo formulário do site. */
export const briefings = sqliteTable("briefings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  email: text("email"),
  projectType: text("project_type").notNull(),
  budget: text("budget"),
  deadline: text("deadline"),
  message: text("message").notNull(),
  lang: text("lang").notNull().default("pt"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
