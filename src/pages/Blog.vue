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

const editorialStats = [
  'Australian events',
  'Club calendars',
  'Junior pathways',
]
</script>

<template>
  <main class="blog-page">
    <section class="blog-hero" aria-labelledby="blog-title">
      <div>
        <p class="eyebrow">GambitForge Editorial</p>
        <h1 id="blog-title">Australian chess writing for players who actually show up.</h1>
        <p>
          Tournament guides, club notes, junior pathways, pairing explainers, and practical
          preparation advice written for the Australian chess calendar.
        </p>
        <div class="blog-editorial-stats" aria-label="Editorial focus areas">
          <span v-for="item in editorialStats" :key="item">{{ item }}</span>
        </div>
      </div>

      <aside class="blog-editorial-poster" :data-tone="featuredArticle.heroTone" aria-label="Featured editorial preview">
        <img
          class="blog-editorial-image"
          src="/sydneyChess-hero.jpg"
          alt="Top Junior Chess Tournaments in Sydney editorial feature card"
          width="720"
          height="720"
          decoding="async"
          fetchpriority="high"
        />
      </aside>
    </section>

    <section class="blog-featured" aria-labelledby="featured-blog-title" itemscope itemtype="https://schema.org/Article">
      <div>
        <p class="eyebrow">Featured analysis</p>
        <h2 id="featured-blog-title" itemprop="headline">{{ featuredArticle.title }}</h2>
        <p itemprop="description">{{ featuredArticle.excerpt }}</p>
        <div class="blog-meta-row">
          <span itemprop="author">By {{ featuredArticle.author }}</span>
          <time>{{ featuredArticle.date }}</time>
          <span>{{ featuredArticle.category }}</span>
          <span>{{ featuredArticle.readingTime }}</span>
        </div>
        <RouterLink class="hero-primary events-submit-button" :to="{ name: 'blog-detail', params: { slug: featuredArticle.slug } }">
          Read Feature
        </RouterLink>
      </div>
      <aside class="blog-featured-brief" aria-label="Featured article notes">
        <span>For parents, clubs, and junior coordinators</span>
        <strong>How to judge whether an event is the right fit before entering.</strong>
        <p>Venue clarity, section strength, supervision, time control, and the post-event learning loop.</p>
      </aside>
    </section>

    <section class="blog-filter-section" aria-labelledby="blog-filter-title">
      <div class="section-kicker">
        <p class="eyebrow">Edition index</p>
        <h2 id="blog-filter-title">Browse by topic</h2>
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
        <div class="article-card-visual" :data-tone="article.heroTone" aria-hidden="true">
          <img src="/blog.png" alt="" width="720" height="720" loading="lazy" decoding="async" />
        </div>
        <h2 itemprop="headline">{{ article.title }}</h2>
        <p itemprop="description">{{ article.excerpt }}</p>
        <div class="blog-card-meta-line">
          <span>{{ article.author }}</span>
          <time>{{ article.date }}</time>
        </div>
        <div class="blog-tag-row">
          <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="blog-card-footer">
          <span>Read article</span>
          <span>{{ article.category }}</span>
        </div>
      </RouterLink>
    </section>
  </main>
</template>
