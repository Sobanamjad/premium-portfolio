import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Helper: parse JSON body from an incoming Node request
function parseBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')) }
      catch { resolve({}) }
    })
  })
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-dev-server',
      configureServer(server) {

        // POST /api/contact
        server.middlewares.use('/api/contact', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./api/contact.js?t=' + Date.now())
          await handler(req, res)
        })

        // POST /api/admin/login
        server.middlewares.use('/api/admin/login', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./api/admin/login.js?t=' + Date.now())
          await handler(req, res)
        })

        // GET/DELETE /api/admin/contacts
        server.middlewares.use('/api/admin/contacts', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          // Parse query string for DELETE ?id=x
          const url = new URL(req.url, 'http://localhost')
          req.query = Object.fromEntries(url.searchParams.entries())
          const { default: handler } = await import('./api/admin/contacts.js?t=' + Date.now())
          await handler(req, res)
        })
      },
    },
  ],

  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion', 'gsap'],
          icons:  ['react-icons'],
        },
      },
    },
  },
})
