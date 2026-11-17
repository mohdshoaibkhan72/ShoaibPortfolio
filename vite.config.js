import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Dev server only: fill <!--seo-head--> with the requested page's own title, description,
 * canonical, Open Graph and JSON-LD — exactly what `npm run build` writes into each page.
 */
function seoHeadInDev() {
  let server
  return {
    name: 'seo-head-dev',
    apply: 'serve',
    configureServer(s) {
      server = s
    },
    async transformIndexHtml(html, ctx) {
      const { getRouteMeta, renderHeadTags } = await server.ssrLoadModule('/src/seo/meta.js')
      return html.replace('<!--seo-head-->', renderHeadTags(getRouteMeta(ctx.originalUrl || ctx.path || '/')))
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoHeadInDev()],
})
