import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'FirstMed API Documentation',
  description: 'API documentation for FirstMed external services (frontend, Schools websites)',
  base: '/firstmed-documentation/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Schools', link: '/schools/lessons' }
    ],
    sidebar: [
      {
        text: 'Schools (B2B)',
        items: [
          { text: 'GET /b2b/companies/:id/lessons', link: '/schools/lessons' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/firstmed/firstmed-documentation' }
    ]
  }
})
