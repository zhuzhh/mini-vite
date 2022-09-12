import path from 'path'
import { build } from 'esbuild'
import { blue, green } from 'picocolors'
import { scanPlugin } from './scanPlugin'
import { preBundlePlugin } from './preBundlePlugin'
import { PRE_BUNDLE_DIR } from '../const'

export async function optimize(root: string) {
  const entry = path.resolve(root, './src/main.ts')
  console.log('entry: ', blue(entry.replace(root, '')))
  const deps = new Set<string>()
  try {
    await build({
      entryPoints: [ entry ],
      bundle: true,
      write: false,
      plugins: [ scanPlugin(deps) ]
    })

    await build({
      entryPoints: [...deps],
      write: true,
      bundle: true,
      format: 'esm',
      splitting: true,
      outdir: path.resolve(root, PRE_BUNDLE_DIR),
      plugins: [ preBundlePlugin(deps) ]
    })
  } catch (e) {
    console.error(e)
  }
  console.log(
    green(
      '需要预构建的依赖: \n' +
      [...deps]
        .map(green)
        .map(item => `  ${item}`)
        .join('\n')
    )
  )

  // 预构建依赖
}

