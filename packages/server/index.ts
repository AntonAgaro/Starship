import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as process from 'process'
import jsesc from 'jsesc'
import { createClientAndConnect } from './db'

const isDev = () => process.env.NODE_ENV === 'development'

createClientAndConnect()

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcClientPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/distSSR/client.cjs')
  let vite: ViteDevServer

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcClientPath,
      appType: 'custom',
    })

    // Use vite's connect instance as middleware. If you use your own
    // express router (express.Router()), you should use router.use
    app.use(vite!.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    let template: string
    let render: (url: string) => Promise<string>

    try {
      //read index.html
      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
        //  Load the server entry.
        render = (await import(ssrClientPath)).render
      } else {
        template = fs.readFileSync(
          path.resolve(srcClientPath, 'index.html'),
          'utf-8'
        )

        template = await vite!.transformIndexHtml(url, template)

        render = (
          await vite!.ssrLoadModule(path.resolve(srcClientPath, 'ssrApp.tsx'))
        ).render
      }

      //  render the app HTML.
      const [initialState, appHtml] = await render(url)
      const initStateSerialized = jsesc(JSON.stringify(initialState), {
        json: true,
        isScriptContext: true,
      })

      //  Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!-- ssr content --->`, appHtml)
        .replace('`<!--store-data-->`', initStateSerialized)

      //  Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
