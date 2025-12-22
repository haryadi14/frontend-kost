<script setup>
import { ref, onMounted } from 'vue'
import Api from '../api/index'
import Swal from 'sweetalert2'

// Data State
const user = ref(null) 
const listKosan = ref([]) 
const searchQuery = ref('') // Variable untuk input pencarian
const isLoading = ref(false) // Variable untuk status loading

onMounted(async () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }

  await fetchKosan()
})

const fetchKosan = async () => {
  isLoading.value = true // Mulai loading
  try {
    // Kirim parameter search ke backend
    const response = await Api.get('/kos', {
        params: { search: searchQuery.value }
    })
    
    // Handle format response
    listKosan.value = response.data.data || response.data 
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false // Selesai loading
  }
}

// --- FUNGSI HAPUS KOSAN (KHUSUS JURAGAN) ---
const handleDelete = async (id_kos) => {
    Swal.fire({
        title: 'Hapus Kosan ini?',
        text: "Data yang dihapus tidak bisa kembali!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await Api.delete(`/kos/${id_kos}`)
                Swal.fire('Terhapus!', 'Data kosan telah dihapus.', 'success')
                fetchKosan() // Refresh list
            } catch (error) {
                Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus.', 'error')
            }
        }
    })
}
</script>

<template>
  <div class="container">
    
    <div class="text-center mb-4 mt-4">
        <h2 class="fw-bold text-dark">
            {{ user?.role === 2 ? 'Kelola Kosan Anda' : 'Temukan Kos Impianmu' }}
        </h2>
        <p class="text-muted">
            {{ user?.role === 2 ? 'Pantau dan kelola properti Anda dengan mudah.' : 'Pilih kosan nyaman, strategis, dan harga terbaik.' }}
        </p>
    </div>

    <div class="row justify-content-center mb-5">
        <div class="col-md-8 col-lg-6">
            <div class="input-group shadow-sm rounded-pill overflow-hidden border">
                <span class="input-group-text bg-white border-0 ps-4 text-muted">
                    <i class="bi bi-search"></i> 🔍
                </span>
                <input 
                    type="text" 
                    class="form-control border-0 py-3 shadow-none" 
                    placeholder="Cari nama kos, kota, atau alamat..." 
                    v-model="searchQuery"
                    @keyup.enter="fetchKosan"
                >
                <button 
                    class="btn btn-primary px-4 fw-bold" 
                    @click="fetchKosan"
                >
                    Cari
                </button>
            </div>
        </div>
    </div>

    <div v-if="user?.role === 2" class="d-flex justify-content-end mb-4">
        <router-link to="/tambah-kos" class="btn btn-success px-4 py-2 shadow-sm rounded-3">
            + Tambah Kosan
        </router-link>
    </div>

    <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Sedang memuat data...</p>
    </div>

    <div v-else class="row">
        
        <div v-if="listKosan.length === 0" class="col-12 text-center mt-3">
            <div class="alert alert-light border py-5 shadow-sm rounded-4">
                <h4 class="text-muted">
                    {{ searchQuery ? 'Pencarian tidak ditemukan 😢' : 'Belum ada data kosan' }}
                </h4>
                <p class="text-muted">
                    {{ searchQuery ? 'Coba kata kunci lain.' : 'Yuk mulai tambahkan properti pertamamu!' }}
                </p>
                <button 
                    v-if="searchQuery" 
                    @click="searchQuery = ''; fetchKosan()" 
                    class="btn btn-outline-secondary mt-2"
                >
                    Tampilkan Semua
                </button>
            </div>
        </div>

        <div v-else v-for="kos in listKosan" :key="kos.id_kos" class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 shadow-sm border-0 hover-card">
                
                <div class="img-wrapper">
                    <img :src="`http://localhost:5000/uploads/${kos.foto_utama}`" 
                         class="card-img-top" 
                         alt="Foto Kos"
                         @error="$event.target.src='https://via.placeholder.com/400x300?text=No+Image'"
                    >
                    <div class="kota-badge">{{ kos.kota }}</div>
                </div>
                
                <div class="card-body">
                    <h5 class="card-title fw-bold text-dark">{{ kos.nama_kos }}</h5>
                    <p class="card-text text-truncate text-secondary small mb-1">
                        {{ kos.deskripsi }}
                    </p>
                    <small class="text-muted d-block"><i class="bi bi-geo-alt"></i> {{ kos.alamat }}</small>
                </div>
                
                <div class="card-footer bg-white border-top-0 pb-3 pt-0">
                    <div class="d-grid gap-2">
                        <router-link 
                            :to="`/detail-kos/${kos.id_kos}`" 
                            class="btn btn-primary"
                        >
                            {{ user?.role === 2 ? '⚙️ Kelola Kamar' : '📄 Lihat Detail' }}
                        </router-link>

                        <div v-if="user?.role === 2" class="row g-2">
                            <div class="col-6">
                                <router-link :to="`/edit-kos/${kos.id_kos}`" class="btn btn-light w-100 border">
                                    ✏️ Edit
                                </router-link>
                            </div>
                            <div class="col-6">
                                <button @click="handleDelete(kos.id_kos)" class="btn btn-outline-danger w-100">
                                    🗑️ Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

  </div>
</template>

<style scoped>
/* STYLE KARTU DASHBOARD */
.hover-card {
  background: #ffffff;
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid #f1f5f9 !important;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
  border-color: var(--primary-color) !important;
}

.img-wrapper {
    position: relative;
    overflow: hidden;
}

.card-img-top {
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.hover-card:hover .card-img-top {
    transform: scale(1.05); /* Efek zoom in gambar saat hover */
}

/* Badge Kota di atas gambar */
.kota-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    backdrop-filter: blur(4px);
}
</style>