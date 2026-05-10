<template>
  <main class="not-found-page">
    <section class="not-found-panel">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>
        This route is not part of GambitForge yet. Head back to the dashboard, tournaments, or the public homepage.
      </p>

      <div class="not-found-actions">
        <RouterLink class="button-link hero-primary" to="/">Home</RouterLink>
        <RouterLink class="button-link secondary-link" to="/tournaments">Tournaments</RouterLink>
      </div>
    </section>
  </main>
</template>
