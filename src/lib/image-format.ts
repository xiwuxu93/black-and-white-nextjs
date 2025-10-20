import { DOWNLOAD_FORMATS, DownloadFormat, OriginalFileInfo } from '@/types/image-processing'

const EXTENSION_ALIAS: Record<string, string> = {
  jpg: 'jpeg',
  jfif: 'jpeg'
}

export const normalizeExtension = (ext: string): string => {
  const clean = ext.replace('.', '').toLowerCase()
  return EXTENSION_ALIAS[clean] || clean
}

export const extractExtension = (filename: string): string => {
  const match = /\.([^.]+)$/.exec(filename)
  return match ? normalizeExtension(match[1]) : ''
}

export const stripExtension = (filename: string): string =>
  filename.replace(/\.[^/.]+$/, '')

export const sanitizeBaseName = (baseName: string): string =>
  baseName.trim().length > 0
    ? baseName.replace(/[^\w\-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    : 'black-and-white-image'

export const findFormatByMime = (mimeType: string): DownloadFormat | undefined => {
  const normalized = mimeType.toLowerCase()
  const alias = normalized === 'image/jpg' ? 'image/jpeg' : normalized
  return DOWNLOAD_FORMATS.find(format => format.mimeType === alias)
}

export const findFormatByExtension = (extension: string): DownloadFormat | undefined =>
  DOWNLOAD_FORMATS.find(format => format.value === normalizeExtension(extension))

export const qualityForFormat = (format: DownloadFormat): number | undefined => {
  switch (format.value) {
    case 'jpeg':
      return 0.92
    case 'webp':
      return 0.96
    default:
      return undefined
  }
}

export const resolveFileInfo = (file: File): { info: OriginalFileInfo; defaultFormat: DownloadFormat } => {
  const extension = extractExtension(file.name)
  const baseName = sanitizeBaseName(stripExtension(file.name))
  const formatFromMime = file.type ? findFormatByMime(file.type) : undefined
  const formatFromExt = extension ? findFormatByExtension(extension) : undefined
  const resolvedFormat = formatFromMime ?? formatFromExt ?? DOWNLOAD_FORMATS[0]

  const info: OriginalFileInfo = {
    name: file.name,
    baseName,
    extension: extension || resolvedFormat.value,
    mimeType: formatFromMime?.mimeType ?? resolvedFormat.mimeType,
    size: file.size
  }

  return {
    info,
    defaultFormat: resolvedFormat
  }
}
