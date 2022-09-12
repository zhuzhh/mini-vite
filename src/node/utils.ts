import path from 'path'
import {
  JS_TYPES_REG,
  HASH_REG,
  QUERY_REG
} from './const'

export const isJsRequest = (id: string): boolean => {
  id = cleanUrl(id)
  if (JS_TYPES_REG.test(id)) return true
  if (!path.extname(id) && !id.endsWith('/')) return true
  return false
}

export const cleanUrl = (url: string): string =>
  url.replace(HASH_REG, '').replace(QUERY_REG, '')
