/** Data demo / types — jadual sebenar dalam content/jadual.json */

export type MatchRow = {
  masa: string;
  court: string;
  reguA: string;
  reguB: string;
  pusingan: string;
  bil?: number;
  tarikh?: string;
  codeA?: string;
  codeB?: string;
  kumpulan?: string;
  geladak?: string;
  keputusan?: string;
};

export type ResultRow = {
  kedudukan: number;
  daerah: string;
  emas: number;
  perak: number;
  gangsa: number;
};

/** @deprecated Guna content/jadual.json — disimpan untuk fallback */
export const placeholderJadual: Record<"u12" | "u15" | "u18", MatchRow[]> = {
  u12: [],
  u15: [],
  u18: [],
};

export const placeholderKeputusan: ResultRow[] = [
  { kedudukan: 1, daerah: "—", emas: 0, perak: 0, gangsa: 0 },
  { kedudukan: 2, daerah: "—", emas: 0, perak: 0, gangsa: 0 },
  { kedudukan: 3, daerah: "—", emas: 0, perak: 0, gangsa: 0 },
];

export const placeholderKeputusanKategori = [
  {
    kategori: "Bawah 12 Tahun",
    emas: "TBA",
    perak: "TBA",
    gangsa: "TBA",
  },
  {
    kategori: "Bawah 15 Tahun",
    emas: "TBA",
    perak: "TBA",
    gangsa: "TBA",
  },
  {
    kategori: "Bawah 18 Tahun",
    emas: "TBA",
    perak: "TBA",
    gangsa: "TBA",
  },
];

export const placeholderGalleryItems = [
  {
    id: "g1",
    day: "Hari 1 · 25 Jul",
    title: "Pembukaan & aksi pagi",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g2",
    day: "Hari 1 · 25 Jul",
    title: "Perlawanan kumpulan",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g3",
    day: "Hari 2 · 26 Jul",
    title: "Suku akhir & separuh akhir",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g4",
    day: "Hari 2 · 26 Jul",
    title: "Final & majlis penutup",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g5",
    day: "Venue",
    title: "STAR Wellness Hub UPSI",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g6",
    day: "Aksi",
    title: "Regu berpasukan",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
];
