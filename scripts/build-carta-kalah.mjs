/**
 * Generate knockout bracket JSON from imported jadual files.
 * Usage: node scripts/build-carta-kalah.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const EDGES = [
  { from: 13, to: 17, side: "A" },
  { from: 14, to: 17, side: "B" },
  { from: 15, to: 18, side: "A" },
  { from: 16, to: 18, side: "B" },
  { from: 17, to: 20, side: "A" },
  { from: 18, to: 20, side: "B" },
  // third place from SF losers — not expressed as team feed until winners known
];

const LABELS = {
  u12: "Bawah 12 Tahun",
  u15: "Bawah 15 Tahun",
  u18: "Bawah 18 Tahun",
};

function mapRound(pusingan, bil) {
  const p = String(pusingan || "").toUpperCase();
  if (p.includes("SUKU") || bil <= 16) {
    const n = p.match(/(\d)/)?.[1] || String(bil - 12);
    return { round: "qf", label: p || `Suku Akhir ${n}` };
  }
  if (p.includes("SEPARUH")) {
    const n = p.match(/(\d)/)?.[1] || (bil === 17 ? "1" : "2");
    return { round: "sf", label: p || `Separuh Akhir ${n}` };
  }
  if (p.includes("TEMPAT") || p.includes("3")) {
    return { round: "third", label: p || "Tempat ke-3 & 4" };
  }
  if (p.includes("AKHIR") || bil === 20) {
    return { round: "final", label: p.includes("SEPARUH") ? p : "Akhir" };
  }
  return { round: "qf", label: p || `Perlawanan ${bil}` };
}

function titleCaseRound(label) {
  return String(label)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/Ke-3 & 4/i, "ke-3 & 4");
}

function buildFromJadual(jadual, acara) {
  const categories = {};
  for (const cat of ["u12", "u15", "u18"]) {
    const block = jadual[cat];
    const matches = (block?.matches || []).filter((m) => m.bil >= 13);
    const slots = matches.map((m) => {
      const { round, label } = mapRound(m.pusingan, m.bil);
      return {
        bil: m.bil,
        round,
        label: titleCaseRound(label),
        tarikh: m.tarikh || "",
        masa: m.masa || "",
        teamA: m.reguA || "TBA",
        teamB: m.reguB || "TBA",
        winner: m.keputusan || "",
      };
    });
    // ensure order 13..20
    slots.sort((a, b) => a.bil - b.bil);
    categories[cat] = {
      category: cat,
      label: LABELS[cat],
      slots,
    };
  }
  return {
    acara,
    generatedAt: new Date().toISOString(),
    categories,
    edges: EDGES,
  };
}

function main() {
  const berpasukan = JSON.parse(
    fs.readFileSync(path.join(root, "content/jadual.json"), "utf8"),
  );
  const quadrant = JSON.parse(
    fs.readFileSync(path.join(root, "content/quadrant-jadual.json"), "utf8"),
  );

  const cartaB = buildFromJadual(berpasukan, "berpasukan");
  const cartaQ = buildFromJadual(quadrant, "quadrant");

  fs.writeFileSync(
    path.join(root, "content/carta-kalah.json"),
    JSON.stringify(cartaB, null, 2) + "\n",
  );
  fs.writeFileSync(
    path.join(root, "content/carta-kalah-quadrant.json"),
    JSON.stringify(cartaQ, null, 2) + "\n",
  );

  console.log(
    "OK berpasukan slots",
    cartaB.categories.u12.slots.length,
    "quadrant",
    cartaQ.categories.u12.slots.length,
  );
}

main();
