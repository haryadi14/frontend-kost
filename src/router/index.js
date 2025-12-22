import { createRouter, createWebHistory } from 'vue-router'

// --- PENTING: Import komponen EditKos agar dikenali ---
import EditKos from '../views/EditKos.vue' 
import EditKamar from '../views/EditKamar.vue' // Import di atas
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. HALAMAN UTAMA (LANDING PAGE)
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingPage.vue') 
    },

    // 2. DASHBOARD
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },

    // 3. AUTH (Login & Register)
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },

    // 4. FITUR KOSAN
    {
      path: '/tambah-kos',
      name: 'tambah-kos',
      component: () => import('../views/TambahKos.vue')
    },
    {
      path: '/detail-kos/:id',
      name: 'detail-kos',
      component: () => import('../views/DetailKos.vue')
    },
    {
      path: '/tambah-kamar/:id',
      name: 'tambah-kamar',
      component: () => import('../views/TambahKamar.vue')
    },
    {
      path: '/tagihan',
      name: 'tagihan',
      component: () => import('../views/Tagihan.vue')
    },
    // RUTE EDIT KOS
    {
      path: '/edit-kos/:id', // :id artinya id-nya berubah-ubah
      name: 'edit-kos',
      component: EditKos // Sekarang ini tidak akan error karena sudah di-import di atas
    },

    {
      path: '/edit-kamar/:id', // :id artinya id-nya berubah-ubah
      name: 'EditKamar-kos',
      component: EditKamar // Sekarang ini tidak akan error karena sudah di-import di atas
    },
    
  ]
})

export default router