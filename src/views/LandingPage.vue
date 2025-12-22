<template>
  <div class="landing-page">
    
    <section class="hero-section d-flex align-items-center">
      <div class="container">
        <div class="row align-items-center">
          
          <div class="col-lg-6 mb-5 mb-lg-0">
            <span class="badge bg-soft-primary text-primary mb-3 px-3 py-2 rounded-pill fw-bold">
              🚀 Solusi Cari Kos No. #1
            </span>
            <h1 class="display-4 fw-bold text-dark mb-3">
              Cari Kos Nyaman,<br> 
              <span class="text-primary">Hidup Lebih Aman.</span>
            </h1>
            <p class="lead text-muted mb-4">
              Temukan ribuan pilihan kos di Bandung dengan harga transparan, fasilitas lengkap, dan pembayaran yang mudah.
            </p>
            
            <div class="d-flex gap-3">
              <router-link to="/dashboard" class="btn btn-primary btn-lg px-4 shadow-sm">
                Mulai Mencari 🔍
              </router-link>
              <router-link to="/register" class="btn btn-outline-secondary btn-lg px-4">
                Daftar Akun
              </router-link>
            </div>

            <div class="mt-5 d-flex gap-5 border-top pt-4">
              <div>
                <h4 class="fw-bold mb-0">1.2k+</h4>
                <small class="text-muted">Kosan Terdaftar</small>
              </div>
              <div>
                <h4 class="fw-bold mb-0">5k+</h4>
                <small class="text-muted">Pencari Aktif</small>
              </div>
            </div>
          </div>

          <div class="col-lg-6 position-relative text-center">
            <div class="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                   alt="Kosan Modern" 
                   class="img-fluid rounded-4 shadow-lg main-img"
              >
              <div class="floating-card p-3 bg-white rounded-3 shadow">
                <div class="d-flex align-items-center gap-3">
                  <div class="icon-box bg-success text-white rounded-circle p-2">
                    ✅
                  </div>
                  <div>
                    <h6 class="mb-0 fw-bold">Terverifikasi</h6>
                    <small class="text-muted">Juragan Asli</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="features-section py-5 bg-white">
      <div class="container py-5">
        <div class="text-center mb-5">
          <h2 class="fw-bold">Kenapa Memilih KosanPro?</h2>
          <p class="text-muted">Kami menjamin kenyamanan pencarian tempat tinggal Anda.</p>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card text-center p-4 h-100 rounded-4 border hover-effect">
              <div class="icon-wrapper mb-3 text-primary bg-light rounded-circle d-inline-flex p-3">
                <i class="bi bi-search fs-3">🔎</i>
              </div>
              <h5 class="fw-bold">Pencarian Mudah</h5>
              <p class="text-muted">Filter berdasarkan lokasi, harga, dan fasilitas sesuai kebutuhanmu.</p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card text-center p-4 h-100 rounded-4 border hover-effect">
              <div class="icon-wrapper mb-3 text-primary bg-light rounded-circle d-inline-flex p-3">
                <i class="bi bi-shield-check fs-3">🛡️</i>
              </div>
              <h5 class="fw-bold">Transaksi Aman</h5>
              <p class="text-muted">Sistem pembayaran terintegrasi dan bukti bayar yang tersimpan rapi.</p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card text-center p-4 h-100 rounded-4 border hover-effect">
              <div class="icon-wrapper mb-3 text-primary bg-light rounded-circle d-inline-flex p-3">
                <i class="bi bi-building fs-3">🏠</i>
              </div>
              <h5 class="fw-bold">Data Lengkap</h5>
              <p class="text-muted">Foto asli, detail fasilitas, dan informasi pemilik kos yang transparan.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section py-5 text-white">
      <div class="container">
        <div class="cta-box rounded-5 p-5 text-center position-relative overflow-hidden">
          <div class="position-relative z-1">
            <h2 class="fw-bold mb-3">Anda Pemilik Kos?</h2>
            <p class="mb-4 opacity-75">Bergabunglah dengan ribuan Juragan lainnya dan kelola kosan Anda secara digital.</p>
            <router-link to="/register" class="btn btn-light text-primary fw-bold px-5 py-3 rounded-pill">
              Daftar Sebagai Juragan
            </router-link>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
/* 1. HERO STYLES */
.hero-section {
  min-height: 90vh; /* Hampir se-layar penuh */
  background: linear-gradient(to right, #f8fafc 50%, #ffffff 50%);
  padding-top: 50px;
}

/* Background Soft untuk Badge */
.bg-soft-primary {
  background-color: rgba(13, 148, 136, 0.1);
}

.hero-image-wrapper {
  position: relative;
  padding: 20px;
}

.main-img {
  border: 10px solid white;
  transform: rotate(2deg);
  transition: transform 0.3s;
}

.hero-image-wrapper:hover .main-img {
  transform: rotate(0deg) scale(1.02);
}

/* Kartu Melayang */
.floating-card {
  position: absolute;
  bottom: 40px;
  left: -20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* 2. FEATURE STYLES */
.hover-effect {
  transition: all 0.3s ease;
  background: white;
}

.hover-effect:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  border-color: var(--primary-color) !important;
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0fdfa !important; /* Hijau muda pudar */
}

/* 3. CTA STYLES */
.cta-box {
  background: linear-gradient(135deg, var(--primary-color) 0%, #0f766e 100%);
  box-shadow: 0 20px 40px -10px rgba(13, 148, 136, 0.4);
}

/* Responsive adjustment */
@media (max-width: 991px) {
  .hero-section {
    background: #f8fafc;
    text-align: center;
  }
  
  .hero-image-wrapper {
    margin-top: 50px;
  }
  
  .floating-card {
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
  }
  
  .d-flex.gap-3 {
    justify-content: center;
  }
  
  .d-flex.gap-5 {
    justify-content: center;
  }
}
</style>