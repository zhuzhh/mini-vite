import { Plugin } from 'esbuild'
import { BARE_IMPORT_REG } from '../const'

export const scanPlugin = (deps: Set<string>): Plugin => {
  return {
    name: 'esbuild:scan-bundle',
    setup(build) {

      build.onResolve(
        { filter: new RegExp('\.(vue)$') },
        resolveInfo => {
          return {
            path: resolveInfo.path,
            external: true
          }
        }
      )

      build.onResolve(
        { filter:BARE_IMPORT_REG },
        resolveInfo => {
          const { path } = resolveInfo
          deps.add(path)
          return {
            path,
            external: true
          }
        }
      )

    }
  }
}
