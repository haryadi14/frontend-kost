<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '../api/index'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const id_kamar = route.params.id

const form = ref({
    nomor_kamar: '',
    lantai: '',
    status_ketersediaan: ''
})

onMounted(async () => {
    try {
        // Ambil data kamar yang mau diedit
        const response = await Api.get(`/kamar/${id_kamar}`)
        const data = response.data.data
        
        // Isi form dengan data lama
        form.value = {
            nomor_kamar: data.nomor_kamar,
            lantai: data.lantai,
            status_ketersediaan: data.status_ketersediaan
        }
    } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data kamar', 'error')
    }
})

const handleUpdate = async () => {
    try {
        await Api.put(`/kamar/${id_kamar}`, form.value)
        Swal.fire('Sukses', 'Data kamar berhasil diperbarui!', 'success')
        router.go(-1) // Kembali ke halaman sebelumnya
    } catch (error) {
        Swal.fire('Gagal', 'Terjadi kesalahan saat menyimpan', 'error')
    }
}
</script>

<template>
<div class="container mt-5">
    <div class="card shadow-sm border-0" style="max-width: 500px; margin: 0 auto;">
        <div class="card-header bg-warning text-dark fw-bold">
            ✏️ Edit Kamar
        </div>
        <div class="card-body p-4">
            <form @submit.prevent="handleUpdate">
                <div class="mb-3">
                    <label class="form-label">Nomor Kamar</label>
                    <input v-model="form.nomor_kamar" type="text" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Lantai</label>
                    <input v-model="form.lantai" type="number" class="form-control" required>
                </div>
                <div class="mb-4">
                    <label class="form-label">Status</label>
                    <select v-model="form.status_ketersediaan" class="form-select">
                        <option value="Tersedia">✅ Tersedia</option>
                        <option value="Terisi">⛔ Terisi</option>
                        <option value="Perbaikan">🔧 Perbaikan</option>
                    </select>
                </div>
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-warning fw-bold">Simpan Perubahan</button>
                    <button type="button" @click="$router.go(-1)" class="btn btn-light border">Batal</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>