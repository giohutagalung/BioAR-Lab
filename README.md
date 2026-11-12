# BioAR Lab — Prototipe Web AR 3D

BioAR Lab adalah prototipe media pembelajaran biologi berbasis web. Website ini menyediakan tiga model 3D lokal:

1. **Sistem Pencernaan** — ilustrasi organ pencernaan manusia.
2. **Struktur Virus** — ilustrasi kapsid, materi genetik, dan protein permukaan.
3. **Sel Hewan** — ilustrasi membran sel dan beberapa organel. 

## Alur penggunaan

1. Buka halaman utama BioAR Lab.
2. Pilih materi, lalu tekan **Lihat model 3D** untuk membuka model tertentu.
3. Atau tekan ikon QR pada kartu materi untuk membuat QR khusus materi tersebut.
4. Setelah website diunggah ke hosting, pindai QR menggunakan kamera ponsel. Halaman materi yang sesuai akan terbuka langsung.
5. Di halaman materi, putar/perbesar model. Pada ponsel yang mendukung AR, tekan **Lihat di ruang nyata** untuk membuka pengalaman AR dan menempatkan model di lingkungan sekitar.

## Menjalankan di komputer

Fitur 3D dapat diuji dengan server lokal. Dari folder proyek, jalankan salah satu perintah berikut:

```bash
python -m http.server 5500
```

Buka `http://localhost:5500` di browser.

> Untuk akses kamera/AR dari ponsel, unggah website ke alamat HTTPS. QR yang dibuat di website akan mengikuti alamat hosting yang sedang dibuka.

## Deploy gratis ke GitHub Pages

1. Buat repository baru di GitHub.
2. Unggah seluruh isi folder ini ke root repository (pastikan `index.html` ada di root).
3. Buka **Settings → Pages**.
4. Pada bagian **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu Save.
5. Setelah alamat GitHub Pages aktif, buka website melalui ponsel. QR Code akan otomatis memakai alamat website tersebut.

Alternatifnya, unggah folder proyek ke Netlify melalui fitur deploy manual.

## Catatan kompatibilitas dan batas prototipe

- Komponen 3D menggunakan `<model-viewer>` dan model berformat `.glb`. Model 3D dapat dilihat pada browser modern.
- Fitur AR mengikuti dukungan perangkat. Android umumnya menggunakan ARCore/Scene Viewer; perangkat Apple dapat menggunakan Quick Look. Tidak semua ponsel mendukung AR.
- Tombol AR perlu ditekan setelah halaman model terbuka. Browser akan meminta izin kamera/sensor bila diperlukan.
- **Mode AR pada prototipe ini adalah markerless/surface placement**: model ditempatkan pada permukaan nyata melalui AR. Model belum dikunci tepat pada gambar halaman buku seperti contoh image-tracking pada referensi. Untuk menempelkan model secara presisi ke ilustrasi tertentu, diperlukan image-target tracking dan file target khusus untuk setiap gambar.
- Model 3D merupakan ilustrasi skematis untuk demonstrasi pembelajaran, bukan model anatomi/virologi klinis dengan skala dan detail ilmiah penuh.

## Struktur folder

```text
ar3d-project/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/app.js
    └── models/
        ├── sistem-pencernaan.glb
        ├── virus.glb
        └── sel-hewan.glb
```

## Teknologi

- HTML, CSS, JavaScript
- Google `<model-viewer>` untuk tampilan 3D dan transisi AR
- QRCode.js untuk membuat QR unik per materi
- Trimesh untuk menyusun aset model 3D `.glb`
