<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router' // <--- 1. TAMBAHKAN useRouter
import Api from '../api/index'
import Swal from 'sweetalert2'
import BookingModal from '../components/BookingModal.vue'

const route = useRoute()
const router = useRouter() // <--- 2. TAMBAHKAN BARIS INI (Wajib ada biar bisa pindah halaman)
const id_kos = route.params.id

// Data State
const kos = ref({})
const listKamar = ref([])
const user = ref(null) 

// State Modal
const showBookingModal = ref(false)
const selectedKamar = ref(null)

onMounted(async () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
  await fetchDetailKos()
  await fetchKamar()
})

const fetchDetailKos = async () => {
  try {
    const response = await Api.get('/kos')
    if (Array.isArray(response.data)) {
        kos.value = response.data.find(k => k.id_kos == id_kos) || {}
    } else {
        kos.value = response.data
    }
  } catch (error) { console.error(error) }
}

const fetchKamar = async () => {
  try {
    // Sesuaikan endpoint ini dengan backend Anda yang terakhir (getKamarByKos)
    const response = await Api.get(`/kamar/kos/${id_kos}`)
    listKamar.value = response.data.data || []
  } catch (error) { console.error(error) }
}

const openBookingModal = (kamar) => {
  selectedKamar.value = kamar
  showBookingModal.value = true
}

const onBookingSuccess = async () => {
  await fetchKamar()
  Swal.fire('Berhasil', 'Status kamar diperbarui.', 'success')
}

const handleDeleteKamar = async (id_kamar) => {
    Swal.fire({
        title: 'Hapus Kamar?',
        text: "Data tidak bisa kembali!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await Api.delete(`/kamar/${id_kamar}`)
                Swal.fire('Terhapus!', 'Kamar dihapus.', 'success')
                fetchKamar()
            } catch (error) {
                Swal.fire('Gagal', 'Error saat menghapus.', 'error')
            }
        }
    })
}

// --- FUNGSI EDIT YANG SEBELUMNYA ERROR ---
const handleEditKamar = (kamar) => {
    // Sekarang ini PASTI BERHASIL karena 'router' sudah didefinisikan di atas
    router.push(`/edit-kamar/${kamar.id_kamar}`)
}
</script>
<template>
  <div class="container mt-5 mb-5">
    
    <div class="card shadow-sm border-0 mb-4">
        <div class="card-body">
            <h2 class="fw-bold text-primary">{{ kos.nama_kos }}</h2>
            <p class="text-muted"><i class="bi bi-geo-alt"></i> {{ kos.alamat }}, {{ kos.kota }}</p>
            <p>{{ kos.deskripsi }}</p>
            
            <router-link 
                v-if="user?.role === 2" 
                :to="`/tambah-kamar/${id_kos}`" 
                class="btn btn-success"
            >
                <i class="bi bi-plus-lg"></i> Tambah Kamar Baru
            </router-link>
        </div>
    </div>

    <h4 class="mb-3 fw-bold">🏠 Daftar Kamar</h4>
    
    <div class="row">
        <div v-if="listKamar.length === 0" class="col-12 text-center py-5">
            <div class="alert alert-light border shadow-sm">
                <h5>Belum ada kamar tersedia di kos ini 😴</h5>
                <p v-if="user?.role === 2">Yuk tambahkan kamar pertama!</p>
            </div>
        </div>

        <div v-else v-for="kamar in listKamar" :key="kamar.id_kamar" class="col-md-3 mb-4">
            <div class="card h-100 border-0 shadow-sm text-center p-3 hover-card">
                
                <h5 class="fw-bold text-dark">No. {{ kamar.nomor_kamar }}</h5>
                <div>
                    <span class="badge bg-secondary mb-3">Lantai {{ kamar.lantai }}</span>
                </div>
                
                <div v-if="kamar.status_ketersediaan === 'Tersedia' || kamar.status === 'Tersedia'">
                    <h6 class="text-primary fw-bold mb-3" v-if="kamar.harga_bulanan">
                        Rp {{ Number(kamar.harga_bulanan).toLocaleString('id-ID') }} <small class="text-muted">/bln</small>
                    </h6>
                    <h6 v-else class="text-success fw-bold mb-3">✅ Tersedia</h6>
                    
                    <button 
                        v-if="user?.role === 3" 
                        @click="openBookingModal(kamar)"
                        class="btn btn-primary w-100"
                    >
                        Pesan Sekarang 🚀
                    </button>
                    
                    <div v-else-if="user?.role === 2" class="d-grid gap-2">
                        <div class="row g-2">
                            <div class="col-6">
                                <button @click="handleEditKamar(kamar)" class="btn btn-warning w-100 btn-sm fw-bold">
                                    ✏️ Edit
                                </button>
                            </div>
                            <div class="col-6">
                                <button @click="handleDeleteKamar(kamar.id_kamar)" class="btn btn-danger w-100 btn-sm fw-bold">
                                    🗑️ Hapus
                                </button>
                            </div>
                        </div>
                    </div>

                    <button v-else class="btn btn-outline-secondary w-100" disabled>
                        Login untuk Pesan
                    </button>
                </div>

                <div v-else>
                    <h5 class="text-danger fw-bold mb-3">⛔ Terisi</h5>
                    
                    <div v-if="user?.role === 2" class="d-grid gap-2">
                         <div class="row g-2">
                            <div class="col-6">
                                <button @click="handleEditKamar(kamar)" class="btn btn-outline-warning w-100 btn-sm">
                                    ✏️ Edit
                                </button>
                            </div>
                            <div class="col-6">
                                <button @click="handleDeleteKamar(kamar.id_kamar)" class="btn btn-outline-danger w-100 btn-sm">
                                    🗑️ Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                    <button v-else class="btn btn-secondary w-100" disabled>Tidak Tersedia</button>
                </div>

            </div>
        </div>
    </div>

    <div class="mt-4">
        <router-link to="/Dashboard" class="btn btn-outline-secondary px-4">
            <i class="bi bi-arrow-left"></i> Kembali ke Dashboard
        </router-link>
    </div>

   <BookingModal 
      :isVisible="showBookingModal"
      :kamar-id="selectedKamar?.id_kamar"      
      :kamar-nomor="selectedKamar?.nomor_kamar"
      :harga-bulanan="Number(selectedKamar?.harga_bulanan)" 
      @close="showBookingModal = false"
      @success="onBookingSuccess" 
    />
  </div>
</template>

<style scoped>
.hover-card {
    transition: transform 0.2s;
}
.hover-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color) !important;
}
</style>