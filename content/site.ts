/**
 * @deprecated Gunakan getSite() dari lib/get-site.ts (server)
 * atau data dari site-config.json melalui props.
 * Fail ini kekal untuk import jenis CategoryId & fallback build.
 */
import type { SiteConfig, CategoryId } from "@/lib/types";
import defaultConfig from "./site-config.json";

export type { CategoryId, SiteConfig };

/** Snapshot lalai (boleh stale selepas admin save — prefer getSite() di server) */
export const site = defaultConfig as SiteConfig;
