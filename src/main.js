
// 1. IMPORT BOOTSTRAP (Agar tampilan rapi)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 2. IMPORT SWEETALERT
import Swal from 'sweetalert2'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$swal = Swal 

app.use(router)
app.mount('#app')