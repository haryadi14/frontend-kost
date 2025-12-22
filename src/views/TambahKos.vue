<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Api from '../api/index'
import Swal from 'sweetalert2'

const router = useRouter()

// Variabel Form
const namaKos = ref('')
const alamat = ref('')
const kota = ref('')
const deskripsi = ref('')
const fileFoto = ref(null)

// Fungsi saat file gambar dipilih
const handleFileUpload = (event) => {
  fileFoto.value = event.target.files[0]
}

// Fungsi Simpan Data
const handleSubmit = async () => {
  if (!fileFoto.value) {
    Swal.fire('Eits!', 'Foto kosan wajib diupload dong.', 'warning')
    return
  }

  // Bungkus data dalam FormData (Wajib untuk upload file)
  let formData = new FormData()
  formData.append('nama_kos', namaKos.value)
  formData.append('alamat', alamat.value)
  formData.append('kota', kota.value)
  formData.append('deskripsi', deskripsi.value)
  formData.append('foto_utama', fileFoto.value)

  try {
    // Kirim ke Backend
    await Api.post('/kos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    await Swal.fire('Berhasil!', 'Data Kosan berhasil ditambahkan.', 'success')
    router.push('/Dashboard') // Balik ke Dashboard

  } catch (error) {
    Swal.fire('Gagal', error.response?.data?.message || 'Terjadi kesalahan server', 'error')
  }
}
</script>

<template>
  <div class="container mt-4">
    <div class="card shadow border-0">
      <div class="card-header bg-success text-white">
        <h5 class="mb-0">🏠 Tambah Data Kosan Baru</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          
          <div class="mb-3">
            <label class="form-label">Nama Kosan</label>
            <input v-model="namaKos" type="text" class="form-control" placeholder="Contoh: Kos Mawar Melati" required>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Kota</label>
              <input v-model="kota" type="text" class="form-control" placeholder="Contoh: Bandung" required>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Alamat Lengkap</label>
              <input v-model="alamat" type="text" class="form-control" placeholder="Jl. Sukabirus No..." required>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Deskripsi Fasilitas</label>
            <textarea v-model="deskripsi" class="form-control" rows="3" placeholder="Dekat kampus, ada AC, dll..." required></textarea>
          </div>

          <div class="mb-4">
            <label class="form-label">Foto Depan (Wajib)</label>
            <input @change="handleFileUpload" type="file" class="form-control" accept="image/*" required>
            <small class="text-muted">Format: JPG, PNG. Maks 2MB.</small>
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success px-4">Simpan Data</button>
            <router-link to="/Dashboard" class="btn btn-secondary px-4">Batal</router-link>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>