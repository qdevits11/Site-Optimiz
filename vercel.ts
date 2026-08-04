import type { VercelConfig } from "@vercel/config/v1";

/**
 * Explicit Vercel project config so Git imports don't fall back to
 * "Other" / wrong output directory (common cause of platform NOT_FOUND).
 */
export const config: VercelConfig = {
  framework: "nextjs",
  installCommand: "npm install",
  buildCommand: "npm run build",
};
