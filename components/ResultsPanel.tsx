"use client";

import berpasukanKeputusan from "@/content/keputusan.json";
import { EventResultsPanel } from "./EventResultsPanel";

/** Keputusan Regu Berpasukan */
export function ResultsPanel() {
  return (
    <EventResultsPanel
      data={berpasukanKeputusan as unknown as Record<string, unknown>}
      acaraLabel="Regu Berpasukan"
    />
  );
}
