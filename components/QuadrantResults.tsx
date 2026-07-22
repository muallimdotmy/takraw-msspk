"use client";

import quadrantKeputusan from "@/content/quadrant-keputusan.json";
import { EventResultsPanel } from "./EventResultsPanel";

export function QuadrantResults() {
  return (
    <EventResultsPanel
      data={quadrantKeputusan as unknown as Record<string, unknown>}
      acaraLabel="Quadrant"
    />
  );
}
