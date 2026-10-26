This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Menambah foto galeri & logo brand (tanpa ubah kode)

Daftar foto galeri dan logo brand dibaca otomatis dari folder `public/` saat
`npm run dev` / `npm run build`. Cukup upload file, lalu build/deploy ulang
(otomatis jika memakai Vercel).

- **Foto galeri produk** → upload ke `public/gallery/` (`.png`, `.jpg`, `.jpeg`,
  `.webp`, atau `.avif`). Urutan mengikuti nama file (pakai awalan angka bila
  ingin mengatur posisi, mis. `05-produk-baru.jpg`). Foto lama
  `public/product-hero-*.png` tetap tampil lebih dulu. Thumbnail WebP dibuat
  otomatis di `public/gallery-thumbs/`.
- **Logo brand** → upload ke `public/logos/`. Nama file harus sama dengan nama
  brand di spreadsheet tanpa spasi/simbol, mis. `royal-canin.png` untuk brand
  "Royal Canin", `meo.png` untuk "Me-O", `kitchenflavour.png` (atau
  `kitchen-flavour.png`) untuk "Kitchen Flavour". Logo langsung muncul di tabel
  produk tanpa mengubah kode.

Setelah menambah/menghapus file, jalankan `npm run media:sync` bila server dev
sedang berjalan. Perintah `dev` dan `build` sudah menjalankannya otomatis.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
