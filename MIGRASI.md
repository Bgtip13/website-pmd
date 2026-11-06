# Migrasi UI/UX Animasi — website-pmd

1. `npm install motion`  (sudah ditambahkan di package.json; `motion` = penerus framer-motion, import dari `motion/react`)
2. Salin folder `src/` ke proyek (timpa file yang sama).
3. `npm run dev`, lalu cek `npm run build` (AGENTS.md menyebut Next versi ini punya breaking changes — baca `node_modules/next/dist/docs/` bila ada error).

## Komponen baru
- lib/motion.ts — easing & variants bersama
- components/motion/{MotionProvider,Reveal,WaveDivider,PawTrail}
- components/ui/{PawButton,TabSwitcher,Skeleton,ProductGallery}
- app/template.tsx — transisi antar-halaman

## Aturan pakai
- Selalu pakai `m.*` (bukan `motion.*`); provider memakai LazyMotion strict.
- layoutId tab harus unik per halaman.
- reduced-motion otomatis dihormati.

## Bug yang ikut diperbaiki
- kemitraan: nomor April salah (628232352405 → 6282323352405)
- Beranda: tombol CTA kedua tadinya hanya ikon tanpa teks
