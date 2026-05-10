import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

const savedTheme = localStorage.getItem('gambitforge-theme')
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
document.documentElement.dataset.theme = savedTheme || (prefersLight ? 'light' : 'dark')

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
