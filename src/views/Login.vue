<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Api from '../api/index'
import Swal from 'sweetalert2'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
    if (!email.value || !password.value) {
        Swal.fire('Peringatan', 'Email dan Password harus diisi!', 'warning')
        return
    }

    isLoading.value = true
    try {
        const response = await Api.post('/auth/login', {
            email: email.value,
            password: password.value
        })

        // Simpan token & user
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        Swal.fire({
            icon: 'success',
            title: 'Login Berhasil!',
            text: 'Selamat datang kembali.',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            router.push('/dashboard')
        })

    } catch (error) {
        Swal.fire('Gagal Login', error.response?.data?.message || 'Terjadi kesalahan', 'error')
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="auth-container d-flex align-items-center justify-content-center">
    <div class="card auth-card border-0 shadow-lg">
        
        <div class="card-header text-white text-center py-4" style="background-color: var(--primary-color);">
            <h3 class="fw-bold mb-0">🔐 Login Area</h3>
            <p class="mb-0 small text-white-50">Masuk untuk mengelola kosan</p>
        </div>

        <div class="card-body p-4 p-md-5">
            <form @submit.prevent="handleLogin">
                <div class="mb-3">
                    <label class="form-label fw-bold">Email Address</label>
                    <div class="input-group">
                        <span class="input-group-text bg-light border-end-0"><i class="bi bi-envelope"></i></span>
                        <input type="email" class="form-control bg-light border-start-0" placeholder="nama@email.com" v-model="email">
                    </div>
                </div>

                <div class="mb-4">
                    <label class="form-label fw-bold">Password</label>
                    <div class="input-group">
                        <span class="input-group-text bg-light border-end-0"><i class="bi bi-key"></i></span>
                        <input type="password" class="form-control bg-light border-start-0" placeholder="••••••••" v-model="password">
                    </div>
                </div>

                <button type="submit" class="btn btn-primary w-100 py-2 fw-bold mb-3" :disabled="isLoading">
                    {{ isLoading ? 'Sedang Memproses...' : '🚀 Masuk Sekarang' }}
                </button>
            </form>
            
            <div class="text-center">
                <p class="text-muted mb-1">Belum punya akun?</p>
                <router-link to="/register" class="fw-bold text-decoration-none text-primary">Daftar Akun Baru</router-link>
            </div>
            
            <hr class="my-4">
            
            <div class="text-center">
                <router-link to="/" class="text-secondary text-decoration-none small">
                    <i class="bi bi-arrow-left"></i> Kembali ke Beranda
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
    min-height: 80vh; /* Agar posisi di tengah layar */
    background-color: transparent; 
}

.auth-card {
    width: 100%;
    max-width: 450px;
    border-radius: 16px;
    overflow: hidden; /* Supaya header mengikuti radius card */
}

/* Mengubah style input form agar lebih modern */
.form-control:focus {
    box-shadow: none;
    border-color: var(--primary-color);
}
.input-group-text {
    border-color: #dee2e6;
}
</style>