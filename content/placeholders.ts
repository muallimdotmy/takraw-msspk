/** Data demo — diganti bila embed sebenar disambung di site.ts */

export type MatchRow = {
  masa: string;
  court: string;
  reguA: string;
  reguB: string;
  pusingan: string;
};

export type ResultRow = {
  kedudukan: number;
  daerah: string;
  emas: number;
  perak: number;
  gangsa: number;
};

export const placeholderJadual: Record<"u12" | "u15" | "u18", MatchRow[]> = {
  u12: [
    {
      masa: "24 Jul · 09:00",
      court: "Court 1",
      reguA: "MSSD Ipoh",
      reguB: "MSSD Kinta",
      pusingan: "Kumpulan A",
    },
    {
      masa: "24 Jul · 09:45",
      court: "Court 2",
      reguA: "MSSD Manjung",
      reguB: "MSSD Hilir Perak",
      pusingan: "Kumpulan A",
    },
    {
      masa: "24 Jul · 10:30",
      court: "Court 1",
      reguA: "MSSD Kuala Kangsar",
      reguB: "MSSD Larut",
      pusingan: "Kumpulan B",
    },
    {
      masa: "24 Jul · 11:15",
      court: "Court 2",
      reguA: "MSSD Batang Padang",
      reguB: "MSSD Muallim",
      pusingan: "Kumpulan B",
    },
    {
      masa: "25 Jul · 09:00",
      court: "Court 1",
      reguA: "Suku 1",
      reguB: "Suku 2",
      pusingan: "Suku Akhir",
    },
    {
      masa: "26 Jul · 14:00",
      court: "Court 1",
      reguA: "Pemenang SF1",
      reguB: "Pemenang SF2",
      pusingan: "Final",
    },
  ],
  u15: [
    {
      masa: "24 Jul · 14:00",
      court: "Court 1",
      reguA: "MSSD Ipoh",
      reguB: "MSSD Kerian",
      pusingan: "Kumpulan A",
    },
    {
      masa: "24 Jul · 14:45",
      court: "Court 2",
      reguA: "MSSD Perak Tengah",
      reguB: "MSSD Manjung",
      pusingan: "Kumpulan A",
    },
    {
      masa: "24 Jul · 15:30",
      court: "Court 1",
      reguA: "MSSD Kinta",
      reguB: "MSSD Muallim",
      pusingan: "Kumpulan B",
    },
    {
      masa: "25 Jul · 09:00",
      court: "Court 2",
      reguA: "MSSD Larut",
      reguB: "MSSD Hulu Perak",
      pusingan: "Kumpulan B",
    },
    {
      masa: "26 Jul · 15:00",
      court: "Court 1",
      reguA: "Pemenang SF1",
      reguB: "Pemenang SF2",
      pusingan: "Final",
    },
  ],
  u18: [
    {
      masa: "24 Jul · 16:00",
      court: "Court 1",
      reguA: "MSSD Ipoh",
      reguB: "MSSD Manjung",
      pusingan: "Kumpulan A",
    },
    {
      masa: "24 Jul · 16:45",
      court: "Court 2",
      reguA: "MSSD Kuala Kangsar",
      reguB: "MSSD Kerian",
      pusingan: "Kumpulan A",
    },
    {
      masa: "25 Jul · 10:00",
      court: "Court 1",
      reguA: "MSSD Hilir Perak",
      reguB: "MSSD Batang Padang",
      pusingan: "Kumpulan B",
    },
    {
      masa: "25 Jul · 10:45",
      court: "Court 2",
      reguA: "MSSD Muallim",
      reguB: "MSSD Kinta",
      pusingan: "Kumpulan B",
    },
    {
      masa: "26 Jul · 10:00",
      court: "Court 1",
      reguA: "Pemenang SF1",
      reguB: "Pemenang SF2",
      pusingan: "Final",
    },
  ],
};

export const placeholderKeputusan: ResultRow[] = [
  { kedudukan: 1, daerah: "MSSD Ipoh", emas: 2, perak: 1, gangsa: 0 },
  { kedudukan: 2, daerah: "MSSD Manjung", emas: 1, perak: 1, gangsa: 1 },
  { kedudukan: 3, daerah: "MSSD Kinta", emas: 0, perak: 1, gangsa: 2 },
  { kedudukan: 4, daerah: "MSSD Muallim", emas: 0, perak: 0, gangsa: 2 },
  { kedudukan: 5, daerah: "MSSD Kerian", emas: 0, perak: 0, gangsa: 1 },
  { kedudukan: 6, daerah: "MSSD Larut", emas: 0, perak: 0, gangsa: 0 },
];

export const placeholderKeputusanKategori = [
  {
    kategori: "Bawah 12 Tahun",
    emas: "MSSD Ipoh",
    perak: "MSSD Manjung",
    gangsa: "MSSD Kinta",
  },
  {
    kategori: "Bawah 15 Tahun",
    emas: "MSSD Manjung",
    perak: "MSSD Ipoh",
    gangsa: "MSSD Muallim",
  },
  {
    kategori: "Bawah 18 Tahun",
    emas: "MSSD Ipoh",
    perak: "MSSD Kinta",
    gangsa: "MSSD Kerian",
  },
];

export const placeholderGalleryItems = [
  {
    id: "g1",
    day: "Hari 1 · 24 Jul",
    title: "Pembukaan & aksi pagi",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g2",
    day: "Hari 1 · 24 Jul",
    title: "Perlawanan kumpulan",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g3",
    day: "Hari 2 · 25 Jul",
    title: "Suku akhir",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g4",
    day: "Hari 2 · 25 Jul",
    title: "Penyokong & regu",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g5",
    day: "Hari 3 · 26 Jul",
    title: "Final",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
  {
    id: "g6",
    day: "Hari 3 · 26 Jul",
    title: "Majlis penutup",
    caption: "Placeholder — ganti dengan foto sebenar",
  },
];
