<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="app-shell authed-shell">
    <Navbar />
    <slot />
  </div>
</template>
