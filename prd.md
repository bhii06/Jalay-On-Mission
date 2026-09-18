# Product Requirement Document (PRD)

**Project Name:** Classified Mission: Daily Mood Booster  
**Target User:** Pasangan (Single End-User)  
**Platform:** Fully Responsive Web Application (Mobile, Tablet, Desktop)  
**Status:** Ready for Development  

---

## 1. Project Overview & Objective

### 1.1 Ringkasan Proyek
Aplikasi web interaktif personal berbasis tema intelijen taktis (*Top Secret Dossier*). Aplikasi ini dirancang untuk memberikan dorongan semangat harian, validasi emosional, dan hiburan santai bagi pasangan melalui serangkaian interaksi bertahap (*staged progression*).

### 1.2 Tujuan Utama
* Menyajikan pesan penyemangat harian dengan kemasan gamifikasi yang unik dan berkesan.
* Mengurangi stres dan kelelahan mental harian melalui interaksi humor dan validasi emosional.
* Menyediakan jembatan komunikasi langsung ke pasangan melalui integrasi tombol darurat WhatsApp.

---

## 2. Tech Stack Architecture

| Layer | Komponen / Library | Kegunaan |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, CSR) | Arsitektur komponen modular dan routing cepat |
| **Styling** | Tailwind CSS | Utility-first styling dengan palet gelap taktis (*zinc/slate*) |
| **Animation** | Framer Motion | Transisi antar-tahap, animasi pemindai laser, dan modal dialog |
| **Effects** | `canvas-confetti` | Efek partikel selebrasi saat pembatalan *self-destruct* |
| **Icons** | `lucide-react` | Aset ikon vektor (sidik jari, telepon, perisai, bom, medali) |
| **Integrasi Eksternal** | WhatsApp Click-to-Chat API | Deep-linking untuk komunikasi transmisi darurat |

---

## 3. Responsive & Viewport Design System

### 3.1 Target Viewport & Layouting
* **Mobile (Primary Target - 360px s.d. 430px):**
  * Tampilan satu kolom (*single-column container*) terpusat.
  * Memakai satuan `min-h-dvh` (*dynamic viewport height*) untuk mencegah gangguan address bar browser (Safari iOS / Chrome Android).
  * Area sentuh minimum 44px × 44px untuk semua elemen interaktif.
* **Tablet (768px s.d. 1024px):**
  * Lebar kontainer dibatasi maksimal `max-w-xl` agar tipografi tetap nyaman dibaca.
* **Desktop (> 1024px):**
  * Tampilan kartu berkas berada persis di tengah layar (*flex center*) dengan latar belakang grid radar bermotif titik/garis halus.

### 3.2 Penanganan Interaksi Lintas Perangkat
* Modul pemindai sidik jari wajib mendukung penanganan ganda:
  * Layar sentuh: `onTouchStart` dan `onTouchEnd`.
  * Desktop (Mouse): `onMouseDown` dan `onMouseUp`.
* Mencegah pergeseran tata letak horizontal (`overflow-x: hidden`) saat animasi partikel atau modal muncul.

---

## 4. User Flow & Screen Specifications

```
[Screen 1: Security Clearance]
              │
              ▼ (Hold Scan 3 Detik)
[Screen 2: Dossier Seal]
              │
              ▼ (Klik "Buka Segel Berkas")
[Screen 3: Mission Briefing & Command Panel]
      ├── Action 1: Red Phone (Redirect ke WhatsApp)
      ├── Action 2: De-eskalasi Stres (Modal Pelukan Virtual)
      └── Action 3: Self-Destruct (Hitung Mundur + Partikel Konfeti)
```

---

## 5. Detailed Functional Requirements

### 5.1 Stage 0: Security Clearance (Biometric Scanner)
* **Visual Interface:**
  * Latar belakang gelap (`bg-zinc-950`) dengan aksen teks terminal monospaced.
  * Lencana status: `[RESTRICTED ACCESS LEVEL 5]`.
  * Lingkaran progres SVG interaktif mengelilingi ikon sidik jari (*fingerprint*).
* **Mekanisme & Logika:**
  * Saat ditekan dan ditahan (*hold*), *timer* progres berjalan bertambah hingga 100% dalam durasi 3 detik.
  * Tampilan laser pemindai bergerak naik-turun secara kontinu selama proses pemindaian aktif.
  * Jika tekanan dilepas sebelum 100%, progres kembali ke 0%.
  * Jika pemindaian sukses mencapai 100%:
    * Status berubah: *“Identitas Terverifikasi: Manusia Terfavorit”*.
    * Setelah jeda 500 ms, layar bertransisi otomatis ke Stage 1 via Framer Motion.

### 5.2 Stage 1: Dekripsi Dokumen (Buka Segel)
* **Visual Interface:**
  * Ikon map folder dengan pita/stempel miring teks merah: `TOP SECRET`.
  * Teks deskripsi: *“Berkas Terenkripsi Ditemukan”*.
* **Mekanisme & Logika:**
  * Tombol CTA: *“Buka Segel Berkas”*.
  * Ketika diklik, memicu animasi pembukaan dokumen dan menampilkan Stage 2.

### 5.3 Stage 2: Lembar Briefing Misi & Surat Penyemangat
* **Struktur Konten Berkas:**
  * **Header:** `HQ INTEL REPORT // KODE: SURVIVE-AND-SLAY` (Status: `SIAGA 1`).
  * **Laporan Situasi:** Validasi rasa lelah dan pengakuan situasi harian secara empatik dan humoris.
  * **Protokol Misi:** Poin wajib (makan siang teratur, konsumsi air putih, dan larangan keras overthinking).
  * **Pesan Panglima Pusat:** Pesan apresiasi tulus dan penegasan dukungan emosional penuh.
  * **Footer Dokumen:** Lencana digital bertuliskan *“Certified Strongest Agent of the Day”*.

---

## 6. Panel Tindakan Darurat (Emergency Controls)

### 6.1 Action A: Red Phone (Hubungi Panglima Perang)
* **Bentuk Elemen:** Tombol merah tebal dengan ikon telepon berdenyut (*pulse effect*) dan aksen bahaya (*hazard*).
* **Mekanisme:** Mengakses URL Scheme WhatsApp:
  `https://wa.me/{nomor_telepon}?text={pesan_terenkripsi}`
* **Format Pesan Default:**
  *“Lapor Panglima Perang! Pasukan garis depan sedang kehabisan amunisi semangat dan butuh dihibur sekarang juga. Harap segera respons laporan ini, ganti! 🫡❤️”*

### 6.2 Action B: De-eskalasi Stres (Pelukan Virtual)
* **Bentuk Elemen:** Tombol abu-abu taktis dengan ikon perisai (`ShieldAlert`).
* **Mekanisme:** Membuka *Modal Dialog* dengan *backdrop blur*.
* **Output:** Animasi ikon hati berkedip, teks konfirmasi: *“Pelukan virtual 100% daya telah ditransmisikan. Beban di pundakmu resmi dikurangi oleh Panglima Pusat.”*

### 6.3 Action C: Protokol Self-Destruct
* **Bentuk Elemen:** Tombol peringatan bahaya dengan ikon bom (`Bomb`).
* **Mekanisme:**
  1. Membuka dialog hitungan mundur layar penuh dari angka 3, 2, hingga 1.
  2. Pada detik ke-0, pembatalan darurat aktif otomatis.
  3. Layar memicu letupan konfeti (`canvas-confetti`) dan menampilkan pesan:
     *“Penghancuran Dibatalkan! Dokumen ini tidak meledak karena dunia masih butuh senyum kamu hari ini.”*
  4. Tersedia tombol konfirmasi: *“Misi Dilanjutkan 🫡”* untuk menutup modal.

---

## 7. Quality & Performance Benchmarks

* **Zero External Database:** Seluruh state dikelola di sisi klien (*local state management*), menjamin *instant load time*.
* **Frame Rate:** Animasi transisi berjalan stabil di 60 FPS pada peramban mobile (iOS Safari & Android Chrome).
* **Asset Optimization:** Tidak menggunakan file gambar berukuran besar; seluruh ikon berbasis SVG vektor via `lucide-react`.
