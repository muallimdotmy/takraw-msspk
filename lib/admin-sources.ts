import { readFileSync, writeFileSync } from "fs";
import path from "path";

export type SheetSource = {
  sheetUrl: string;
  fileId: string;
  label: string;
};

export type AdminSources = {
  berpasukan: SheetSource;
  quadrant: SheetSource;
  logosFolder?: {
    folderUrl: string;
    folderId: string;
    label: string;
  };
  purpose: string;
  updatedAt: string;
  /** Legacy single-sheet shape (optional, for migration) */
  sheetUrl?: string;
  fileId?: string;
};

const SOURCES_PATH = path.join(
  process.cwd(),
  "content",
  "admin-sources.json",
);

export function getAdminSourcesPath() {
  return SOURCES_PATH;
}

export function getAdminSources(): AdminSources {
  const raw = readFileSync(SOURCES_PATH, "utf8");
  const data = JSON.parse(raw) as AdminSources;

  // Migrate legacy single-url format
  if (!data.berpasukan && data.sheetUrl) {
    data.berpasukan = {
      sheetUrl: data.sheetUrl,
      fileId: data.fileId || "",
      label: "Regu Berpasukan — jadual & keputusan",
    };
  }
  if (!data.quadrant) {
    data.quadrant = {
      sheetUrl: "",
      fileId: "",
      label: "Quadrant — jadual & keputusan",
    };
  }
  return data;
}

export function saveAdminSources(sources: AdminSources) {
  // Preserve existing logosFolder if not provided in payload
  let existing: Partial<AdminSources> = {};
  try {
    existing = getAdminSources();
  } catch {
    existing = {};
  }
  const clean: AdminSources = {
    berpasukan: sources.berpasukan,
    quadrant: sources.quadrant,
    logosFolder: sources.logosFolder || existing.logosFolder,
    purpose:
      sources.purpose ||
      "Pautan Google Drive/Sheet rujukan admin sahaja — tidak dipaparkan di laman awam",
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(SOURCES_PATH, JSON.stringify(clean, null, 2) + "\n", "utf8");
}
