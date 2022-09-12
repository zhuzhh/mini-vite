import { NextHandleFunction } from 'connect'
import createdDebug from 'debug'
import { ServerContext } from '../server'
import {
  isJsRequest,
  cleanUrl
} from '../utils'

const debug = createdDebug('dev')

export function transformRequest(
  url: string,
  serverContext: ServerContext
): NextHandleFunction {
  const { pluginContainer } = serverContext
  url = cleanUrl(url)
  const resolvedResult = await pluginContainer.resolveId(url)
  let transformResult
  if (resolvedResult?.id) {
    let code = await pluginContainer.load(resolvedResult.id)
    if (typeof code === 'object' && code !== null) {
      code = code.code
    }
    if (code) {
      transformResult = await pluginContainer.transform(
        code as string,
        resolvedResult?.id
      )
    }
  }
  return transformResult
}

export function transformMiddleware(
  serverContext: ServerContext
): NextHandleFunction {
  return async (req, res, next) => {
    const { url, method } = req
    if (method !== 'GET' || !url) {
      return next()
    }
    debug('transformMiddleware: %s', url)
    if (isJsRequest(url)) {
      let result = await transformRequest(url, serverContext)
      if (!result) {
        return next()
      }
      if (typeof result === 'string') {
        result = res.code
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/javascript')
      return res.end(result)
    }
    next()
  }
}
