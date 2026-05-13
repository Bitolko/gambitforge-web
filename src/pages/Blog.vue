<script setup>
import { computed, ref } from 'vue'
import { blogArticles, blogCategories } from '../data/blogArticles'

const activeCategory = ref('All')

const featuredArticle = computed(() => blogArticles[0])

const filteredArticles = computed(() => (
  activeCategory.value === 'All'
    ? blogArticles
    : blogArticles.filter((article) => article.category === activeCategory.value)
))
</script>

<template>
  <main class="blog-page">
    <section class="blog-hero" aria-labelledby="blog-title">
      <div>
        <p class="eyebrow">GambitForge Blog</p>
        <h1 id="blog-title">Chess Guides for Australia’s Tournament Ecosystem</h1>
        <p>
          Practical, searchable articles for players, parents, coaches, clubs, and organisers
          building stronger chess communities across Australia.
        </p>
      </div>

      <aside class="blog-editorial-poster" :data-tone="featuredArticle.heroTone" aria-label="Featured editorial preview">
        <span>{{ featuredArticle.category }}</span>
        <strong>{{ featuredArticle.readingTime }}</strong>
        <em>Editorial feature</em>
      </aside>
    </section>

    <section class="blog-featured" aria-labelledby="featured-blog-title" itemscope itemtype="https://schema.org/Article">
      <div>
        <p class="eyebrow">Featured guide</p>
        <h2 id="featured-blog-title" itemprop="headline">{{ featuredArticle.title }}</h2>
        <p itemprop="description">{{ featuredArticle.excerpt }}</p>
        <div class="blog-meta-row">
          <span itemprop="author">{{ featuredArticle.author }}</span>
          <time>{{ featuredArticle.date }}</time>
          <span>{{ featuredArticle.readingTime }}</span>
        </div>
        <RouterLink class="hero-primary events-submit-button" :to="{ name: 'blog-detail', params: { slug: featuredArticle.slug } }">
          Read Feature
        </RouterLink>
      </div>
    </section>

    <section class="blog-filter-section" aria-labelledby="blog-filter-title">
      <div class="section-kicker">
        <p class="eyebrow">Browse articles</p>
        <h2 id="blog-filter-title">Filter by topic</h2>
      </div>

      <div class="events-filter-group" aria-label="Blog category filters">
        <button
          v-for="category in blogCategories"
          :key="category"
          class="event-filter-pill"
          :class="{ active: activeCategory === category }"
          type="button"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <section class="blog-grid" aria-label="Chess articles">
      <RouterLink
        v-for="article in filteredArticles"
        :key="article.slug"
        class="blog-card"
        :to="{ name: 'blog-detail', params: { slug: article.slug } }"
        itemscope
        itemtype="https://schema.org/Article"
      >
        <div class="preview-card-heading">
          <span class="coming-soon-badge">{{ article.category }}</span>
          <small>{{ article.readingTime }}</small>
        </div>
        <h2 itemprop="headline">{{ article.title }}</h2>
        <p itemprop="description">{{ article.excerpt }}</p>
        <div class="blog-tag-row">
          <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="blog-card-footer">
          <span>{{ article.author }}</span>
          <time>{{ article.date }}</time>
        </div>
      </RouterLink>
    </section>
  </main>
</template>
