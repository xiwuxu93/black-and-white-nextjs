export const SITE_URL = 'https://bwconverter.com'

const normalizePath = (path: string): string => {
  if (!path || path === '/') {
    return '/'
  }

  const hasLeadingSlash = path.startsWith('/')
  const cleanedPath = hasLeadingSlash ? path : `/${path}`
  return cleanedPath.endsWith('/') ? cleanedPath : `${cleanedPath}/`
}

export const canonicalUrl = (path: string = '/'): string => {
  const normalizedPath = normalizePath(path)
  return normalizedPath === '/'
    ? `${SITE_URL}/`
    : `${SITE_URL}${normalizedPath}`
}

export const absoluteUrl = (path: string = '/'): string => {
  const normalizedPath = normalizePath(path)
  return `${SITE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`
}
