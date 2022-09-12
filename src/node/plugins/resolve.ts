import resolve from 'resolve'
import path from 'path'
import { pathExists } from 'fs-extra'
import { DEFAULT_EXTENSION } from '../const'
import { Plugin } from '../plugin'
import { ServerContext } from '../server'

export function resolvePlugin(): Plugin {
  let serverContext: ServerContext
  return {
    name: 'mini-vite:resolve',
    configureServer(server) {
      serverContext = server
    },
    async resolveId(id: string, importer?: string) {
      if (path.isAbsolute(id)) {
        if (await pathExists(id)) {
          return { id }
        }
        id = path.join(serverContext.root, id)
        if (await pathExists(id)) {
          return { id }
        }
      } else if (id.startsWith('.')) {
        if (!importer) {
          throw new Error('`importer` should not be undefined')
        }
        const hasExtension = path.extname(id).length > 1
        let resolvedId: string
        if (hasExtension) {
          resolvedId = resolve.sync(id, { basedir: path.dirName(importer) })
          if (await pathExists(resolvedId)) {
            return { id: resolvedId }
          }
        }
      } else {
        for (const extname of DEFAULT_EXTENSION) {
          try {
            const withExtension = `${id}${extname}`
            resolvedId = resolve.sync(withExtension, {
              basedir: path.dirname(importer)
            })
            if (await pathExists(resolvedId)) {
              return { id: resolvedId }
            }
          } catch (e) {
            continue
          }
        }
      }
      return null
    }
  }
}
