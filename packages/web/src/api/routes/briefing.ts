import { z } from "zod";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import { briefings } from "../database/schema";

const input = z.object({
  name: z.string().trim().min(2).max(120),
  whatsapp: z.string().trim().min(8).max(32),
  email: z.union([z.literal(""), z.string().trim().email().max(160)]).optional(),
  projectType: z.string().trim().min(1).max(60),
  budget: z.string().trim().max(60).optional(),
  deadline: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10).max(4000),
  lang: z.enum(["pt", "en"]).default("pt"),
  /** honeypot — bots fill it, humans never see it */
  website: z.string().max(0).optional(),
});

// Rate limit simples em memória: 5 envios / 10 min por IP.
const hits = new Map<string, number[]>();

export const createBriefing = base.input(input).handler(async ({ input, context }) => {
  const ip = context.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) throw new ORPCError("TOO_MANY_REQUESTS", { message: "rate_limited" });
  hits.set(ip, [...recent, now]);

  const { website: _hp, ...data } = input;
  const [row] = await db
    .insert(briefings)
    .values({ ...data, email: data.email || null })
    .returning({ id: briefings.id });
  return { ok: true as const, id: row.id };
});
export const briefing = createBriefing;
