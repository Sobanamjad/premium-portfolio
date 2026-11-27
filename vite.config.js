import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

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
        server.middlewares.use('/api/contact', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./src/handlers/contact.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/skills', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          const { default: handler } = await import('./src/handlers/skills.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/services', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          const { default: handler } = await import('./src/handlers/services.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/projects', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          const { default: handler } = await import('./src/handlers/projects.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/experience', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          const { default: handler } = await import('./src/handlers/experience.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/about', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          const { default: handler } = await import('./src/handlers/about.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/login', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./src/handlers/admin/login.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/contacts', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const url = new URL(req.url, 'http://localhost')
          req.query = Object.fromEntries(url.searchParams.entries())
          const { default: handler } = await import('./src/handlers/admin/contacts.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/skills', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const url = new URL(req.url, 'http://localhost')
          req.query = Object.fromEntries(url.searchParams.entries())
          const { default: handler } = await import('./src/handlers/admin/skills.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/services', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const url = new URL(req.url, 'http://localhost')
          req.query = Object.fromEntries(url.searchParams.entries())
          const { default: handler } = await import('./src/handlers/admin/services.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/projects', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const url = new URL(req.url, 'http://localhost')
          req.query = Object.fromEntries(url.searchParams.entries())
          const { default: handler } = await import('./src/handlers/admin/projects.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/experience', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const url = new URL(req.url, 'http://localhost')
          req.query = Object.fromEntries(url.searchParams.entries())
          const { default: handler } = await import('./src/handlers/admin/experience.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/about', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./src/handlers/admin/about.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/seed-skills', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./src/handlers/admin/seed-skills.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/seed-services', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./src/handlers/admin/seed-services.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/seed-projects', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./src/handlers/admin/seed-projects.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/seed-experience', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./src/handlers/admin/seed-experience.js')
          await handler(req, res)
        })

        server.middlewares.use('/api/admin/seed-about', async (req, res) => {
          if (req.method === 'OPTIONS') { res.writeHead(200); return res.end() }
          res.setHeader('Content-Type', 'application/json')
          req.body = await parseBody(req)
          const { default: handler } = await import('./src/handlers/admin/seed-about.js')
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
