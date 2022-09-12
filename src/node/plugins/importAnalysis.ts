import {init, parse} from 'es-module-lexer'
import MagicString from 'magic-string'
import path from 'path'
import { Plugin } from '../plugin'
import { ServerContext } from '../server'
import {
  BARE_IMPORT_REG,
  PRE_BUNDLE_DIR
} from '../const'
import {
  isJsRequest
} from '../utils'

export function importAnalysisPlugin(): Plugin {
  let serverContext: ServerContext
  return {
    name: 'mini-vite:import-analysis',
    configureServer(s) {
      serverContext = s
    },
    async transform(code: string, id: string) {
      if (!isJsRequest(id)) return null
      await init
      const { imports } = parse(code)
      const ms = new MagicString(code)
      for (const importInfo of imports) {
        const { s: modStart, e: modEnd, n: modSource } = importInfo
        if (!modSource) continue
        if (BARE_IMPORT_REG.test(modSource)) {
          const bundlePath = path.join(
            serverContext.root,
            PRE_BUNDLE_DIR,
            `${modSource}.js`
          )
          ms.overwrite(modStart, modEnd, bundlePath)
        } else if (modSource.startsWith('.') || modSource.startsWith('/')) {
          const resolved = await this.resolve(modSource, id)
          if (resolved) {
            ms.overwrite(modStart, modEnd, resolved)
          }
        }
      }

      return {
        code: ms.toString(),
        map: ms.generateMap()
      }
    }
  }
}
