import path from 'path'

export const BARE_IMPORT_REG = /^[\w@][^:]/

export const PRE_BUNDLE_DIR = path.join('node_modules', '.m-vite')

export const JS_TYPES_REG = /\.(?:j|t)sx?$|\.mjs$/;

export const QUERY_REG = /\?.*$/s;

export const HASH_REG = /#.*$/s;

export const DEFAULT_EXTENSION = [".tsx", ".ts", ".jsx", "js"];
