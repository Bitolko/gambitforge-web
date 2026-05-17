<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { blogArticles, getArticleBySlug } from '../data/blogArticles'

const route = useRoute()

const article = computed(() => getArticleBySlug(route.params.slug))

const relatedArticles = computed(() => (
  blogArticles
    .filter((item) => item.slug !== article.value.slug)
    .filter((item) => item.category === article.value.category || item.tags.some((tag) => article.value.tags.includes(tag)))
    .slice(0, 3)
))
</script>

<template>
  <main class="blog-detail-page">
    <article class="blog-article-shell" itemscope itemtype="https://schema.org/Article">
      <header class="blog-article-hero">
        <div>
          <RouterLink class="back-link" to="/blog">Blog</RouterLink>
          <p class="eyebrow">{{ article.category }}</p>
          <h1 itemprop="headline">{{ article.title }}</h1>
          <p class="blog-article-intro" itemprop="description">{{ article.excerpt }}</p>
          <div class="blog-meta-row">
            <span itemprop="author">{{ article.author }}</span>
            <time itemprop="datePublished">{{ article.date }}</time>
            <span>{{ article.readingTime }}</span>
          </div>
        </div>

        <aside class="blog-editorial-poster" :data-tone="article.heroTone" aria-label="Article visual summary">
          <img
            class="blog-editorial-image"
            :src="article.ogImage || '/blog.png'"
            :alt="`${article.title} editorial feature card`"
            width="720"
            height="720"
            decoding="async"
            fetchpriority="high"
          />
        </aside>
      </header>

      <section class="blog-article-body" itemprop="articleBody">
        <p class="blog-lead">{{ article.intro }}</p>

        <aside v-if="article.takeaways?.length" class="article-takeaways" aria-label="Key takeaways">
          <h2>Key takeaways</h2>
          <ul>
            <li v-for="takeaway in article.takeaways" :key="takeaway">{{ takeaway }}</li>
          </ul>
        </aside>

        <section v-for="section in article.sections" :key="section.heading">
          <h2>{{ section.heading }}</h2>
          <p>{{ section.body }}</p>
          <ul v-if="section.bullets?.length">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </section>
      </section>

      <footer class="blog-share-panel">
        <div>
          <p class="eyebrow">Discoverability</p>
          <h2>Built for players, parents, coaches, and organisers</h2>
          <p>Future sharing tools can connect articles to events, clubs, profiles, and coaching workflows.</p>
        </div>
        <div class="blog-tag-row">
          <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
        </div>
      </footer>
    </article>

    <section class="blog-related-section" aria-labelledby="related-blog-title">
      <div class="section-kicker">
        <p class="eyebrow">Keep reading</p>
        <h2 id="related-blog-title">Related chess guides</h2>
      </div>

      <div class="blog-grid">
        <RouterLink
          v-for="item in relatedArticles"
          :key="item.slug"
          class="blog-card"
          :to="{ name: 'blog-detail', params: { slug: item.slug } }"
        >
          <div class="preview-card-heading">
            <span class="coming-soon-badge">{{ item.category }}</span>
            <small>{{ item.readingTime }}</small>
          </div>
          <div class="article-card-visual" :data-tone="item.heroTone" aria-hidden="true">
            <img src="/blog.png" alt="" width="720" height="720" loading="lazy" decoding="async" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.excerpt }}</p>
        </RouterLink>
      </div>
    </section>
  </main>
</template>
