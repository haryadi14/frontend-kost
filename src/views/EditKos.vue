<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '../api/index'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const kosId = route.params.id

// Variabel Form (Sesuai Database Anda)
const nama_kos = ref('')
const kota = ref('')
const alamat = ref('')
const deskripsi = ref('')
const previewImage = ref('')
const newImage = ref(null)

// State Loading (Agar tidak blank saat ambil data)
const isLoading = ref(true)

onMounted(async () => {
  try {
    console.log("Mengambil data untuk ID:", kosId); // Cek di Console Browser (F12)

    const response = await Api.get(`/kos/${kosId}`)
    console.log("Response dari Backend:", response.data); // Cek strukturnya

    // Ambil data (sesuaikan dengan controller backend: res.json({ success: true, data: ... }))
    const data = response.data.data || response.data;

    if (data) {
        nama_kos.value = data.nama_kos || '' // Pakai fallback '' biar tidak error
        kota.value = data.kota || ''
        alamat.value = data.alamat || ''
        deskripsi.value = data.deskripsi || ''
        
        // Tampilkan foto lama (Ganti 5000 jika port backend Anda beda)
        if (data.foto_utama) {
            previewImage.value = `http://localhost:5000/uploads/${data.foto_utama}`
        }
    }

  } catch (error) {
    console.error("Error Ambil Data:", error)
    Swal.fire('Error', 'Gagal mengambil data kos. Cek Console.', 'error')
  } finally {
    isLoading.value = false // Tampilkan form setelah selesai loading
  }
})

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    newImage.value = file
    previewImage.value = URL.createObjectURL(file) // Preview langsung
  }
}

const updateKos = async () => {
  let formData = new FormData()
  formData.append('nama_kos', nama_kos.value)
  formData.append('kota', kota.value)
  formData.append('alamat', alamat.value)
  formData.append('deskripsi', deskripsi.value)

  if (newImage.value) {
    formData.append('image', newImage.value) // Backend minta 'image' (upload.single('image'))
  }

  try {
    await Api.put(`/kos/${kosId}`, formData)
    
    Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data kosan telah diperbarui.',
        timer: 1500,
        showConfirmButton: false
    })
    
    router.push('/Dashboard') // Kembali ke Dashboard

  } catch (error) {
    console.error(error)
    Swal.fire('Gagal Update', 'Terjadi kesalahan sistem', 'error')
  }
}
</script>

<template>
  <div class="container mt-5">
    
    <div v-if="isLoading" class="text-center mt-5">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p>Sedang memuat data...</p>
    </div>

    <div v-else class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow border-0">
          <div class="card-header bg-warning fw-bold">
            ✏️ Edit Kosan
          </div>
          <div class="card-body">
            
            <form @submit.prevent="updateKos">
              
              <div class="mb-3">
                <label class="form-label fw-bold">Nama Kos</label>
                <input type="text" class="form-control" v-model="nama_kos" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Kota</label>
                <input type="text" class="form-control" v-model="kota" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Alamat</label>
                <textarea class="form-control" v-model="alamat" rows="2"></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Deskripsi</label>
                <textarea class="form-control" v-model="deskripsi" rows="3"></textarea>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold">Foto Utama</label>
                <div v-if="previewImage" class="mb-2">
                    <img :src="previewImage" class="img-thumbnail" width="200" style="height: 150px; object-fit: cover;">
                </div>
                <input type="file" class="form-control" @change="handleFileChange" accept="image/*">
                <small class="text-muted">Biarkan kosong jika foto tidak diganti.</small>
              </div>

              <div class="d-flex gap-2">
                <router-link to="/Dashboard" class="btn btn-secondary w-50">Batal</router-link>
                <button type="submit" class="btn btn-warning w-50 fw-bold">SIMPAN</button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>