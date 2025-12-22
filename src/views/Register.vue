<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Api from '../api/index'
import Swal from 'sweetalert2'

const router = useRouter()

// Menggunakan object 'form' agar lebih rapi
const form = ref({
    nama_lengkap: '',
    email: '',
    password: '',
    role: 3 // Default: Pencari Kos
})

const isLoading = ref(false)

const handleRegister = async () => {
    // Validasi sederhana
    if (!form.value.nama_lengkap || !form.value.email || !form.value.password) {
        Swal.fire('Peringatan', 'Mohon lengkapi semua data!', 'warning')
        return
    }

    isLoading.value = true
    try {
        await Api.post('/auth/register', {
            nama_lengkap: form.value.nama_lengkap,
            email: form.value.email,
            password: form.value.password,
            role: parseInt(form.value.role)
        })

        Swal.fire({
            icon: 'success',
            title: 'Registrasi Berhasil!',
            text: 'Akun telah dibuat. Silakan Login.',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            router.push('/login')
        })
        
    } catch (error) {
        Swal.fire('Gagal', error.response?.data?.message || 'Terjadi kesalahan saat mendaftar', 'error')
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="auth-container d-flex align-items-center justify-content-center">
    <div class="card auth-card border-0 shadow-lg">
        
        <div class="card-header text-white text-center py-4" style="background-color: var(--primary-color);">
            <h3 class="fw-bold mb-0">📝 Daftar Akun</h3>
            <p class="mb-0 small text-white-50">Bergabunglah dengan KosanPro</p>
        </div>

        <div class="card-body p-4 p-md-5">
            <form @submit.prevent="handleRegister">
                
                <div class="mb-3">
                    <label class="form-label fw-bold">Nama Lengkap</label>
                    <div class="input-group">
                        <span class="input-group-text bg-light border-end-0"><i class="bi bi-person"></i></span>
                        <input type="text" class="form-control bg-light border-start-0" v-model="form.nama_lengkap" placeholder="Contoh: Budi Santoso" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-bold">Email Address</label>
                    <div class="input-group">
                        <span class="input-group-text bg-light border-end-0"><i class="bi bi-envelope"></i></span>
                        <input type="email" class="form-control bg-light border-start-0" v-model="form.email" placeholder="nama@email.com" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-bold">Password</label>
                    <div class="input-group">
                        <span class="input-group-text bg-light border-end-0"><i class="bi bi-key"></i></span>
                        <input type="password" class="form-control bg-light border-start-0" v-model="form.password" placeholder="Minimal 6 karakter" required>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="form-label fw-bold">Daftar Sebagai:</label>
                    <div class="input-group">
                        <span class="input-group-text bg-light border-end-0"><i class="bi bi-people"></i></span>
                        <select v-model="form.role" class="form-select bg-light border-start-0">
                            <option value="3">👤 Pencari Kos</option>
                            <option value="2">🏠 Pemilik Kos (Juragan)</option>
                        </select>
                    </div>
                </div>

                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary fw-bold py-2" :disabled="isLoading">
                        {{ isLoading ? 'Sedang Mendaftar...' : '✨ Buat Akun Baru' }}
                    </button>
                </div>
            </form>

            <div class="text-center mt-4">
                <small class="text-muted">Sudah punya akun?</small>
                <router-link to="/login" class="fw-bold text-decoration-none text-primary ms-1">
                    Login disini
                </router-link>
            </div>

            <div class="text-center mt-3 pt-3 border-top">
                <router-link to="/" class="text-secondary text-decoration-none small">
                    <i class="bi bi-arrow-left"></i> Kembali ke Beranda
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS yang sama persis dengan Login.vue agar konsisten */
.auth-container {
    min-height: 85vh; /* Sedikit lebih tinggi karena form register lebih panjang */
    padding: 20px;
}

.auth-card {
    width: 100%;
    max-width: 450px;
    border-radius: 16px;
    overflow: hidden;
}

/* Style Input agar border focus mengikuti warna tema */
.form-control:focus, .form-select:focus {
    box-shadow: none;
    border-color: var(--primary-color);
}

.input-group-text {
    border-color: #dee2e6;
    color: #6c757d;
}
</style>