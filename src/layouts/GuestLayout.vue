<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="app-shell guest-shell">
    <Navbar />
    <slot />
  </div>
</template>
