<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <article class="feature-card">
    <p class="panel-label">{{ label }}</p>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </article>
</template>
