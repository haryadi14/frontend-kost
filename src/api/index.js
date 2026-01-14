import axios from 'axios';

const Api = axios.create({
    // Arahkan ke Backend Node.js Anda
    baseURL: 'https://danikos.my.id/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// --- BAGIAN INI YANG KEMARIN TERTINGGAL ---
// Fungsi ini otomatis mengecek LocalStorage dan mengambil Token sebelum request dikirim
Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Selipkan token di Header Authorization
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// ------------------------------------------

export default Api;