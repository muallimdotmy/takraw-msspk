import { readFileSync } from "fs";
import path from "path";
import type { SiteConfig } from "./types";

const CONFIG_PATH = path.join(process.cwd(), "content", "site-config.json");

export function getSiteConfigPath() {
  return CONFIG_PATH;
}

export function getSite(): SiteConfig {
  const raw = readFileSync(CONFIG_PATH, "utf8");
  return JSON.parse(raw) as SiteConfig;
}

export function isValidSiteConfig(data: unknown): data is SiteConfig {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.event === "object" &&
    d.event !== null &&
    typeof d.embeds === "object" &&
    typeof d.links === "object" &&
    Array.isArray(d.nav) &&
    Array.isArray(d.stats) &&
    Array.isArray(d.categories) &&
    Array.isArray(d.gallery) &&
    typeof d.footer === "object"
  );
}
