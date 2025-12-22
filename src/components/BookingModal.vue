<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h3>🏠 Ajukan Sewa Kamar</h3>
      <p class="room-name">Kamar No. {{ kamarNomor }}</p>

      <form @submit.prevent="submitBooking">
        <div class="form-group">
          <label>Mulai Tanggal:</label>
          <input type="date" v-model="form.tanggal_mulai" required />
        </div>

        <div class="form-group">
          <label>Durasi Sewa (Bulan):</label>
          <select v-model="form.durasi_bulan" required>
            <option value="1">1 Bulan</option>
            <option value="3">3 Bulan</option>
            <option value="6">6 Bulan</option>
            <option value="12">1 Tahun</option>
          </select>
        </div>

        <div class="total-price" v-if="hargaBulanan">
          <p>Total: <strong>Rp {{ formatRupiah(hargaBulanan * form.durasi_bulan) }}</strong></p>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-cancel" @click="closeModal">Batal</button>
          <button type="submit" class="btn-submit" :disabled="isLoading">
            {{ isLoading ? 'Mengirim...' : 'Kirim Pengajuan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isVisible: Boolean,
    kamarId: Number,
    kamarNomor: String,
    hargaBulanan: Number
  },
  data() {
    return {
      isLoading: false,
      form: {
        tanggal_mulai: '', // Default kosong
        durasi_bulan: 1
      }
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    formatRupiah(value) {
      return new Intl.NumberFormat('id-ID').format(value);
    },
    async submitBooking() {
      // 1. Validasi di Frontend Dulu
      if (!this.form.tanggal_mulai) {
        alert("Mohon pilih tanggal mulai sewa terlebih dahulu!");
        return;
      }
      if (!this.kamarId) {
        alert("Error: ID Kamar tidak ditemukan. Silakan refresh halaman.");
        return;
      }

      this.isLoading = true;
      try {
        const token = localStorage.getItem('token');
        
        // 2. LOG DATA untuk cek di Console (Klik kanan -> Inspect -> Console)
        console.log("Mengirim Data Booking:", {
            id_kamar: this.kamarId,
            tanggal_mulai: this.form.tanggal_mulai,
            durasi_bulan: this.form.durasi_bulan
        });

        await axios.post('http://localhost:5000/api/booking', {
          id_kamar: this.kamarId,
          tanggal_mulai: this.form.tanggal_mulai,
          durasi_bulan: this.form.durasi_bulan
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        alert('Pengajuan booking berhasil dikirim! Tunggu konfirmasi pemilik.');
        this.closeModal();
        this.$emit('success'); 
      } catch (error) {
        console.error("Error Booking:", error.response);
        // Tampilkan pesan error spesifik dari backend
        alert(error.response?.data?.message || 'Gagal melakukan booking.');
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Style Sederhana untuk Modal Pop-up */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.room-name {
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 15px;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.btn-cancel {
  background: #ccc;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-submit {
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-submit:disabled {
  background: #94d3a2;
}
</style>