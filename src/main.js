import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'


import router from './router/router'




createApp(App)
.use(VuePlyr,{plyr:{}})
.use(router)
.mount('#app')
