import teamLogos from "@/content/team-logos.json";

type TeamEntry = {
  name: string;
  logo: string;
  source?: string;
  sheet?: string;
  code?: string;
};

const teams = (teamLogos as { teams: Record<string, TeamEntry> }).teams;

function normalize(name: string) {
  const n = (name || "").trim().toUpperCase();
  if (n === "LMS" || n === "LARUT MTG SELAMA") return "LARUT MATANG SELAMA";
  return n;
}

export function getTeamLogo(name: string): string | null {
  const key = normalize(name);
  if (!key || key === "TBA" || key === "—") return null;
  return teams[key]?.logo ?? null;
}

export function getAllTeams(): TeamEntry[] {
  return Object.values(teams).sort((a, b) => a.name.localeCompare(b.name));
}
