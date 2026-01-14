1. Persiapan Awal (Software Wajib)
Sebelum koding, pastikan komputer Anda sudah terinstall aplikasi berikut:

Node.js (Versi LTS)

Fungsi: Menjalankan JavaScript di luar browser dan memproses perintah npm.

Cara Cek: Buka terminal/CMD, ketik node -v. Jika muncul angka versi (misal v18.x.x), berarti aman.

Download: nodejs.org

Visual Studio Code (VS Code)

Fungsi: Text editor untuk menulis kode.

Download: code.visualstudio.com

Git (Opsional tapi disarankan)

Fungsi: Untuk menyimpan versi kodingan (source control).
2. Cara Membuat Project Baru (Jika dari Nol)
Jika Anda belum punya folder proyeknya, ini cara membuatnya menggunakan Vite (lebih cepat dari Vue CLI):

Buka Terminal di folder tujuan.

Ketik perintah:

Bash

npm create vite@latest nama-project-anda

Pilih framework: Vue.

Pilih varian: JavaScript.

Masuk ke folder: cd nama-project-anda.

3. Instalasi Library (Dependencies)
Agar aplikasi KosanPro berjalan dengan fitur-fitur yang sudah kita buat (Navigasi, Alert, Desain, Koneksi API), Anda perlu menginstall library berikut.

Jalankan perintah ini di terminal VS Code (di dalam folder frontend):

A. Install Dependency Utama Wajib dilakukan pertama kali setelah download/clone project.

Bash

npm install

B. Install Library Tambahan (Yang kita pakai di KosanPro) Ketik perintah ini satu per satu atau sekaligus:

Vue Router (Untuk pindah halaman tanpa refresh):

Bash

npm install vue-router

Axios (Untuk menghubungkan Frontend ke Backend/Database):

Bash

npm install axios

Bootstrap 5 (Untuk desain CSS instan/layout):

Bash

npm install bootstrap @popperjs/core

Catatan: @popperjs/core dibutuhkan agar dropdown/modal Bootstrap berfungsi.

SweetAlert2 (Untuk popup alert yang cantik):

Bash

npm install sweetalert2

4. Konfigurasi Wajib (Main.js)
Setelah install library, jangan lupa daftarkan di src/main.js agar bisa dipakai di seluruh aplikasi.

Pastikan file src/main.js Anda isinya seperti ini:

JavaScript

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import Router

// Import Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

app.use(router) // Gunakan Router
app.mount('#app')

5. Cara Menjalankan Aplikasi
Setelah semua siap, saatnya menyalakan server frontend.

Pastikan terminal berada di folder project frontend.

Ketik perintah:

Bash

npm run dev

Tunggu hingga muncul tulisan seperti:

➜  Local:   http://localhost:5173/

Tekan Ctrl + Klik pada link tersebut (atau copy paste ke browser).

Selesai! Aplikasi KosanPro Anda sudah jalan.
