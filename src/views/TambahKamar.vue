<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '../api/index'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const id_kos = route.params.id

// Data Form
const listTipe = ref([]) // Untuk Dropdown
const tipeBaru = ref({ nama: '', harga: '', deskripsi: '' }) // Form Tipe
const kamarBaru = ref({ nomor: '', lantai: '', id_tipe: '' }) // Form Kamar

onMounted(async () => {
  await fetchTipeKamar()
})

// 1. Ambil Data Tipe Kamar (Untuk isi Dropdown)
const fetchTipeKamar = async () => {
  try {
    // Backend harus punya route ini. Kalau belum, nanti kita buat.
    // Kita filter manual dulu dari semua tipe
    const response = await Api.get('/tipe')
    listTipe.value = response.data.filter(t => t.id_kos == id_kos)
  } catch (error) {
    console.log("Belum ada tipe kamar, silakan buat baru.")
  }
}

// 2. Fungsi Simpan Tipe Baru (Harga & Fasilitas)
const handleSimpanTipe = async () => {
  try {
    await Api.post('/tipe', {
        id_kos: id_kos,
        nama_tipe: tipeBaru.value.nama,
        harga_bulanan: tipeBaru.value.harga,
        deskripsi: tipeBaru.value.deskripsi
    })
    
    Swal.fire('Sukses', 'Tipe kamar (Harga) berhasil dibuat!', 'success')
    tipeBaru.value = { nama: '', harga: '', deskripsi: '' } // Reset form
    await fetchTipeKamar() // Refresh dropdown

  } catch (error) {
    Swal.fire('Gagal', 'Gagal membuat tipe. Cek Backend.', 'error')
  }
}

// 3. Fungsi Simpan Unit Kamar (Nomor Fisik)
const handleSimpanKamar = async () => {
  try {
    if(!kamarBaru.value.id_tipe) {
        Swal.fire('Eits!', 'Pilih dulu tipe kamarnya (Harganya berapa?)', 'warning')
        return
    }

    await Api.post('/kamar', {
        id_tipe: kamarBaru.value.id_tipe,
        nomor_kamar: kamarBaru.value.nomor,
        lantai: kamarBaru.value.lantai,
        status: 'Tersedia'
    })

    Swal.fire({
        title: 'Berhasil!',
        text: 'Kamar berhasil ditambahkan.',
        icon: 'success'
    }).then(() => {
        // Balik ke halaman detail kos
        router.push(`/detail-kos/${id_kos}`)
    })

  } catch (error) {
    Swal.fire('Gagal', 'Gagal simpan kamar. Pastikan nomor belum dipakai.', 'error')
  }
}
</script>

<template>
  <div class="container mt-5 mb-5">
    <h3 class="fw-bold mb-4">⚙️ Kelola Kamar & Harga</h3>

    <div class="row">
        
        <div class="col-md-5">
            <div class="card shadow-sm border-0 bg-light">
                <div class="card-header bg-warning text-dark fw-bold">
                    1. Buat Tipe Harga Dulu
                </div>
                <div class="card-body">
                    <p class="small text-muted">Sebelum bikin nomor kamar, tentukan harga tipe-nya dulu (Contoh: VIP, Reguler).</p>
                    <form @submit.prevent="handleSimpanTipe">
                        <div class="mb-2">
                            <label>Nama Tipe</label>
                            <input v-model="tipeBaru.nama" class="form-control" placeholder="Cth: VIP AC" required>
                        </div>
                        <div class="mb-2">
                            <label>Harga Per Bulan</label>
                            <input v-model="tipeBaru.harga" type="number" class="form-control" placeholder="Cth: 1500000" required>
                        </div>
                        <div class="mb-3">
                            <label>Fasilitas Singkat</label>
                            <input v-model="tipeBaru.deskripsi" class="form-control" placeholder="Cth: AC, TV, WiFi Kenceng">
                        </div>
                        <button type="submit" class="btn btn-warning w-100">Simpan Tipe</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-md-7">
            <div class="card shadow border-0">
                <div class="card-header bg-success text-white fw-bold">
                    2. Tambah Unit Kamar
                </div>
                <div class="card-body">
                    <form @submit.prevent="handleSimpanKamar">
                        
                        <div class="mb-3">
                            <label class="fw-bold">Pilih Tipe / Harga</label>
                            <select v-model="kamarBaru.id_tipe" class="form-select" required>
                                <option value="" disabled>-- Pilih Tipe --</option>
                                <option v-for="tipe in listTipe" :key="tipe.id_tipe" :value="tipe.id_tipe">
                                    {{ tipe.nama_tipe }} - Rp {{ tipe.harga_bulanan.toLocaleString() }}
                                </option>
                            </select>
                            <div v-if="listTipe.length === 0" class="text-danger small mt-1">
                                * Tipe masih kosong! Isi form di sebelah kiri dulu ya. 👈
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6 mb-3">
                                <label>Nomor Kamar</label>
                                <input v-model="kamarBaru.nomor" type="text" class="form-control" placeholder="Cth: 101" required>
                            </div>
                            <div class="col-6 mb-3">
                                <label>Lantai</label>
                                <input v-model="kamarBaru.lantai" type="number" class="form-control" placeholder="1" required>
                            </div>
                        </div>

                        <div class="d-flex gap-2 mt-3">
                            <button type="submit" class="btn btn-success flex-grow-1">Simpan Kamar</button>
                            <router-link :to="`/detail-kos/${id_kos}`" class="btn btn-outline-secondary">Batal</router-link>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>