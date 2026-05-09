<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'
import GuestLayout from './layouts/GuestLayout.vue'

const route = useRoute()
const layout = computed(() => (route.meta.requiresAuth ? AppLayout : GuestLayout))
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
