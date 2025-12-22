<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()

// State User
const isLoggedIn = ref(false)
const user = ref(null)

const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  const userData = localStorage.getItem('user')
  
  if (token && userData) {
    isLoggedIn.value = true
    user.value = JSON.parse(userData)
  } else {
    isLoggedIn.value = false
    user.value = null
  }
}

watch(route, () => {
  checkLoginStatus()
})

onMounted(() => {
  checkLoginStatus()
})

const handleLogout = () => {
  Swal.fire({
    title: 'Keluar dari aplikasi?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#ef4444'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear()
      isLoggedIn.value = false
      router.push('/login')
      Swal.fire('Logout Berhasil', 'Sampai jumpa lagi!', 'success')
    }
  })
}
</script>

<template>
  <div class="app-wrapper">
    
    <nav class="navbar navbar-expand-lg fixed-top glass-navbar">
      <div class="container">
        
        <router-link to="/" class="navbar-brand">
          🏠 Kosan<span class="text-primary">Pro</span>
        </router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center gap-3">
            
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active-link">Home</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link" active-class="active-link">Cari Kos</router-link>
            </li>
            
            <template v-if="isLoggedIn">
              <li class="nav-item">
                <router-link to="/tagihan" class="nav-link" active-class="active-link">
                  Tagihan Saya
                </router-link>
              </li>
              
              <li class="nav-item d-flex align-items-center gap-2 border-start ps-3 ms-2 profile-section">
                <div class="text-end lh-1 d-none d-lg-block">
                  <small class="d-block text-muted" style="font-size: 10px;">Halo,</small>
                  <span class="fw-bold" style="font-size: 14px;">{{ user?.nama_lengkap }}</span>
                </div>
                <button @click="handleLogout" class="btn btn-sm btn-outline-danger px-3 rounded-pill">
                  Logout
                </button>
              </li>
            </template>

            <template v-else>
              <li class="nav-item ms-2" v-if="route.path !== '/login'">
                <router-link to="/login" class="btn btn-primary px-4 rounded-pill">Masuk</router-link>
              </li>
            </template>

          </ul>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer-custom">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-3">
            <h5 class="fw-bold text-white">KosanPro</h5>
            <p class="text-secondary small">Platform pencari kos terbaik, aman, dan terpercaya.</p>
          </div>
          <div class="col-md-3 mb-3">
            <h6 class="fw-bold text-white">Navigasi</h6>
            <ul class="list-unstyled text-secondary small">
              <li><router-link to="/" class="footer-link">Home</router-link></li>
              <li><router-link to="/dashboard" class="footer-link">Cari Kos</router-link></li>
              <li><router-link to="/tagihan" class="footer-link">Cek Tagihan</router-link></li>
            </ul>
          </div>
          <div class="col-md-3 mb-3">
            <h6 class="fw-bold text-white">Kontak</h6>
            <p class="text-secondary small">support@kosanpro.id</p>
          </div>
        </div>
        <hr class="border-secondary">
        <div class="text-center text-secondary small">
          &copy; 2025 KosanPro. All rights reserved.
        </div>
      </div>
    </footer>

  </div>
</template>
<style>
/* ... (Style CSS Anda sebelumnya biarkan saja, tidak perlu diubah) ... */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
:root { --primary-color: #0d9488; --secondary-color: #0f172a; --bg-color: #f8fafc; }
body { font-family: 'Poppins', sans-serif !important; background-color: var(--bg-color) !important; color: #334155; margin: 0; }
.app-wrapper { display: flex; flex-direction: column; min-height: 100vh; }
.main-content { flex: 1; padding-top: 90px; padding-bottom: 40px; }
.glass-navbar { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(0,0,0,0.05); padding: 15px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02); }
.navbar-brand { font-weight: 800; color: var(--secondary-color) !important; font-size: 1.5rem; letter-spacing: -0.5px; }
.nav-link { color: #64748b !important; font-weight: 500; font-size: 0.95rem; transition: color 0.3s; }
.nav-link:hover, .active-link { color: var(--primary-color) !important; }
.footer-custom { background-color: var(--secondary-color); padding: 50px 0 20px; margin-top: auto; }
.footer-link { color: #94a3b8; text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: var(--primary-color); }
.btn-primary { background-color: var(--primary-color) !important; border-color: var(--primary-color) !important; }
.text-primary { color: var(--primary-color) !important; }
</style>