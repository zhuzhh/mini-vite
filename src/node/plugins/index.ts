import { Plugin } from '../plugin'
import { importAnalysisPlugin } from './importAnalysis'
import { resolvePlugin } from './resolve'
import { esbuildTransformPlugin } from './esbuild'

export function resolvePlugins(): Plugin[] {
  return [resolvePlugin(), esbuildTransformPlugin(), importAnalysisPlugin()]
}
