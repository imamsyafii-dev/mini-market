# MiniMarket

MiniMarket adalah proyek pembelajaran marketplace sederhana berbasis Next.js. Aplikasi mengambil katalog dari DummyJSON, menyediakan halaman detail produk, pencarian dan filter kategori, serta alur belanja di browser mulai dari favorit dan keranjang sampai simulasi checkout.

## Fitur

- Katalog produk responsif dari DummyJSON.
- Pencarian produk dan filter kategori melalui query URL.
- Halaman detail produk dengan informasi stok, harga, merek, status, dan garansi.
- Metadata dinamis untuk halaman produk, termasuk Open Graph.
- Keranjang belanja berbasis Redux: tambah produk, ubah jumlah, hapus item, kosongkan keranjang, dan hitung subtotal.
- Wishlist dengan tombol tambah/hapus favorit dan halaman daftar favorit.
- Persistensi keranjang dan wishlist di `localStorage`.
- Simulasi checkout dengan validasi data pembeli dan pilihan transfer bank atau COD.
- Halaman konfirmasi pesanan dummy yang tersimpan sementara di `sessionStorage`.
- Tampilan loading, error, empty state, dan halaman produk tidak ditemukan.
- Badge jumlah barang dan produk favorit pada navigasi.

## Teknologi

- Next.js 16 dengan App Router dan Server Components
- React 19
- Redux Toolkit dan React Redux
- DummyJSON sebagai sumber data produk eksternal
- JavaScript dan CSS native
- ESLint dengan konfigurasi Next.js

## Menjalankan secara lokal

Prasyarat: Node.js dan npm sudah terpasang.

```bash
git clone https://github.com/imamsyafii-dev/mini-market.git
cd mini-market
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

Untuk mencoba build produksi:

```bash
npm run build
npm run start
```

## Route

| Route | Keterangan |
| --- | --- |
| `/` | Katalog, pencarian, dan filter kategori |
| `/?q=phone` | Contoh pencarian berdasarkan kata kunci |
| `/?category=smartphones` | Contoh filter berdasarkan kategori |
| `/products/[id]` | Detail produk dan aksi keranjang/favorit |
| `/wishlist` | Daftar produk favorit |
| `/cart` | Isi keranjang dan ringkasan belanja |
| `/checkout` | Form simulasi checkout |
| `/checkout-success` | Konfirmasi pesanan dummy terakhir pada sesi browser |

## Struktur ringkas

```text
src/
├── app/                    # Route, layout, metadata, loading, dan error UI
│   ├── products/[id]/      # Detail produk dan not-found
│   ├── wishlist/           # Halaman favorit
│   ├── cart/               # Halaman keranjang
│   ├── checkout/           # Simulasi checkout
│   └── checkout-success/   # Konfirmasi pesanan
├── components/
│   ├── layout/             # Header dan footer
│   └── product/            # Kartu, filter, dan tombol aksi produk
├── hooks/                  # Kesiapan render sisi client
├── lib/                    # Akses DummyJSON dan penyimpanan pesanan
└── store/                  # Redux store, cart, wishlist, dan persistensi
```

## Alur data dan penyimpanan

1. Server Component mengambil produk dan kategori langsung dari DummyJSON dengan `cache: "no-store"`.
2. Query `q` dan `category` menentukan endpoint atau penyaringan katalog yang digunakan.
3. Aksi keranjang dan wishlist diproses oleh Redux Toolkit di sisi client.
4. `StoreProvider` memuat state awal dari `localStorage`, lalu menyimpan perubahan berikutnya kembali ke browser.
5. Checkout memvalidasi form di sisi client, menyimpan ringkasan pesanan terakhir di `sessionStorage`, mengosongkan keranjang, lalu membuka halaman konfirmasi.

Data browser yang digunakan:

- `mini-market:cart` — item keranjang di `localStorage`.
- `mini-market:wishlist` — produk favorit di `localStorage`.
- `mini-market:last-order` — konfirmasi pesanan terakhir di `sessionStorage`.

## Script

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan development server |
| `npm run build` | Membuat production build |
| `npm run start` | Menjalankan production server hasil build |
| `npm run lint` | Menjalankan ESLint |

## Batasan

- Produk bergantung pada ketersediaan layanan eksternal DummyJSON.
- Keranjang, wishlist, dan ringkasan pesanan terakhir hanya tersimpan di browser yang sedang digunakan.
- Checkout hanya simulasi; tidak ada pembayaran nyata atau pengiriman pesanan.
- Tidak ada akun pengguna, autentikasi, database, atau sinkronisasi lintas perangkat.
- Belum ada backend/API internal untuk menyimpan transaksi.
- Harga mengikuti data sumber dan ditampilkan dalam USD.
