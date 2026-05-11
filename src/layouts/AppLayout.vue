<script setup>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="app-shell authed-shell">
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>
