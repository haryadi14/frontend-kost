<script setup>
import { ref, onMounted } from 'vue'
import Api from '../api/index'
import Swal from 'sweetalert2'

const listData = ref([])
const user = ref(null)

onMounted(async () => {
    const userData = localStorage.getItem('user')
    if (userData) user.value = JSON.parse(userData)
    await fetchData()
})

const fetchData = async () => {
    try {
        const response = await Api.get('/transaksi')
        listData.value = response.data
    } catch (error) {
        console.error(error)
    }
}

// --- FUNGSI USER: UPLOAD BUKTI ---
const handleUpload = async (id_tagihan) => {
    const { value: file } = await Swal.fire({
        title: 'Upload Bukti Transfer',
        input: 'file',
        inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Upload foto bukti transfer'
        },
        showCancelButton: true,
        confirmButtonText: 'Kirim Bukti 📤'
    })

    if (file) {
        const formData = new FormData()
        formData.append('bukti', file)

        try {
            // KITA TAMBAHKAN HEADER KHUSUS DI SINI
            await Api.post(`/transaksi/${id_tagihan}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            Swal.fire('Terkirim!', 'Menunggu konfirmasi pemilik kos.', 'success')
            fetchData()
        } catch (error) {
            console.error("Error Upload:", error) // Cek Console Browser (F12)
            Swal.fire('Gagal', 'Gagal upload gambar.', 'error')
        }
    }
}

// --- FUNGSI JURAGAN: VALIDASI ---
const handleValidasi = async (item, aksi) => {
    // Tampilkan gambar dulu sebelum konfirmasi
    if (aksi === 'terima') {
        const result = await Swal.fire({
            title: 'Validasi Pembayaran?',
            text: 'Pastikan dana sudah masuk ke rekening Anda.',
            imageUrl: `http://localhost:5000/uploads/${item.bukti_bayar}`,
            imageAlt: 'Bukti Transfer',
            imageHeight: 300,
            showCancelButton: true,
            confirmButtonText: 'Ya, Terima ✅',
            cancelButtonText: 'Batal'
        })
        if (!result.isConfirmed) return;
    }

    try {
        await Api.post(`/transaksi/${item.id_tagihan}/validasi`, { aksi })
        Swal.fire('Sukses', `Pembayaran berhasil di-${aksi}`, 'success')
        fetchData()
    } catch (error) {
        Swal.fire('Error', 'Gagal memproses.', 'error')
    }
}
</script>

<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">{{ user?.role === 2 ? '📊 Validasi Pembayaran' : '💰 Tagihan Saya' }}</h2>
        <span class="badge bg-primary fs-6">{{ user?.role === 2 ? 'Mode Juragan' : 'Mode Pencari' }}</span>
    </div>

    <div v-if="listData.length === 0" class="alert alert-info">Belum ada data.</div>

    <div v-else class="row">
        <div v-for="item in listData" :key="item.id_tagihan" class="col-md-6 mb-4">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white fw-bold d-flex justify-content-between">
                    <span>#INV-{{ item.id_tagihan }}</span>
                    <span :class="{
                        'text-success': item.status_tagihan === 'Lunas',
                        'text-warning': item.status_tagihan === 'Menunggu Konfirmasi',
                        'text-danger': item.status_tagihan === 'Belum Bayar' || item.status_tagihan === 'Ditolak'
                    }">
                        {{ item.status_tagihan }}
                    </span>
                </div>

                <div class="card-body">
                    <div v-if="user?.role === 2">
                        <h5 class="fw-bold">{{ item.nama_lengkap }}</h5>
                        <p class="mb-1">{{ item.nama_kos }} - Kamar {{ item.nomor_kamar }}</p>
                        <h5 class="text-success fw-bold mt-2">+ Rp {{ Number(item.jumlah_tagihan).toLocaleString() }}</h5>
                        
                        <div v-if="item.status_tagihan === 'Menunggu Konfirmasi'" class="mt-3">
                            <div class="d-grid gap-2">
                                <button @click="handleValidasi(item, 'terima')" class="btn btn-success">✅ Cek Bukti & Terima</button>
                                <button @click="handleValidasi(item, 'tolak')" class="btn btn-outline-danger">❌ Tolak</button>
                            </div>
                        </div>
                        <div v-else class="mt-3 text-muted fst-italic">
                            Status: {{ item.status_tagihan }}
                        </div>
                    </div>

                    <div v-else>
                        <h5 class="fw-bold">{{ item.nama_kos }}</h5>
                        <p>{{ item.alamat }}</p>
                        <div class="d-flex justify-content-between">
                            <span>Total:</span>
                            <span class="fw-bold">Rp {{ Number(item.jumlah_tagihan).toLocaleString() }}</span>
                        </div>
                        
                        <div class="d-grid mt-3">
                            <button 
    v-if="item.status_tagihan === 'Belum Bayar' || item.status_tagihan === 'Belum Lunas' || item.status_tagihan === 'Ditolak'" 
    @click="handleUpload(item.id_tagihan)" 
    class="btn btn-primary"
>
    📤 Upload Bukti Transfer
</button>
                            
                            <button v-else-if="item.status_tagihan === 'Menunggu Konfirmasi'" class="btn btn-warning text-white" disabled>
                                ⏳ Sedang Dicek Admin
                            </button>
                            
                            <button v-else class="btn btn-secondary" disabled>
                                ✅ Lunas
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
    <div class="mt-4 text-center">
        <router-link to="/Dashboard" class="btn btn-outline-primary">Kembali ke Dashboard</router-link>
    </div>
  </div>
</template>