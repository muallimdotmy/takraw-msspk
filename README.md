# TAKRAW MSSPk 2026

Landing page arkib modern untuk **Kejohanan Sepak Takraw MSS Perak 2026**.

Stack: **Next.js** · **Tailwind CSS** · deploy **Vercel**.

## Development

```bash
cd takraw-msspk
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Panel Admin

Buka **[http://localhost:3000/admin](http://localhost:3000/admin)**

- Kata laluan lalai: `msspk2026`
- Tukar dengan env `ADMIN_PASSWORD` (lihat `.env.example`)
- Simpan akan tulis ke **`content/site-config.json`**
- Pada Vercel (filesystem read-only), admin akan muat turun JSON untuk anda commit

## Kemas kini kandungan & embed

Guna panel **Admin**, atau edit **`content/site-config.json`** secara manual:

| Medan | Contoh |
|-------|--------|
| `embeds.jadual.u12/u15/u18` | Google Sheets *Publish to web* → URL `/pubhtml` |
| `embeds.keputusan` | Sheets/Docs publish URL |
| `embeds.bukuProgram` | `https://drive.google.com/file/d/FILE_ID/preview` |
| `embeds.youtube.majlisPenutup` | `https://www.youtube.com/embed/VIDEO_ID` |
| `embeds.maps` | Google Maps embed `src` |
| `links.*` | Pautan fallback “buka tab baharu” |

### Cara publish Google Sheets untuk embed

1. File → **Share** → **Publish to web**
2. Pilih sheet / seluruh dokumen → HTML
3. Salin URL, letak dalam `site.ts`

### Cara embed PDF Google Drive

1. Upload PDF → Share: **Anyone with the link**
2. URL format: `https://drive.google.com/file/d/<FILE_ID>/preview`

## Logo

Logo rasmi MSSPk: `public/logo-msspk.png`  
(sumber: laman Google Sites rasmi)

## Deploy Vercel

1. Push repo ke GitHub
2. Import di [vercel.com](https://vercel.com) — Framework: Next.js
3. Deploy

Custom domain (contoh `takrawmsspk.muallim.my`) boleh ditetapkan dalam Vercel → Domains.

## Build

```bash
npm run build
npm start
```
