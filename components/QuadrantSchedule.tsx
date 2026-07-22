"use client";

import quadrantJadual from "@/content/quadrant-jadual.json";
import { EventScheduleTabs } from "./EventScheduleTabs";

export function QuadrantSchedule() {
  return (
    <EventScheduleTabs
      data={quadrantJadual as unknown as Record<string, unknown>}
      acaraLabel="Quadrant"
    />
  );
}
