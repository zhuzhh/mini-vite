import { NextHandleFunction } from 'connect'
import { ServerContext } from '../index'
import path from 'path'
import { pathExists, readFile } from 'fs-extra'

export function indexHtmlMiddleware(
  serverContext: ServerContext
): NextHandleFunction {
  return async (req, res, next) => {
    const url = req.url
    console.log('url: ', url)
    if (url === '/') {
      const { root } = serverContext
      const p = path.join(root, './index.html')
      if (await pathExists(p)) {
        let html = await readFile(p, 'utf-8')
        // 通过执行插件的 transformIndexHtml 方法来对 HTML 进行自定义的修改
        for (const plugin of serverContext.plugins) {
          if (plugin.transformIndexHtml) {
            html = await plugin.transformIndexHtml(html)
          }
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        return res.end(html)
      }
    } else if (url === '/src/main.ts') {

    }
    return next()
  }
}
