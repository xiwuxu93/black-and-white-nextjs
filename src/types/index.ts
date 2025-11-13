/**
 * Base type definitions
 */
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

/**
 * API response types
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

/**
 * Pagination types
 */
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination
}

/**
 * File-related types
 */
export interface FileInfo {
  id: string
  name: string
  size: number
  type: string
  url?: string
  extension: string
  uploadedAt: Date
}

export interface UploadProgress {
  fileId: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
}

/**
 * Tool parameter types
 */
export interface ToolParameter {
  id: string
  name: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'range' | 'color'
  defaultValue: any
  value: any
  options?: Array<{ label: string; value: any }>
  min?: number
  max?: number
  step?: number
  required?: boolean
  description?: string
}

export interface ToolConfig {
  id: string
  name: string
  description: string
  parameters: ToolParameter[]
  category: string
  tags: string[]
}

/**
 * Processing result types
 */
export interface ProcessResult {
  id: string
  toolId: string
  input: any
  output: any
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress?: number
  error?: string
  createdAt: Date
  completedAt?: Date
  processingTime?: number
}

/**
 * User settings types
 */
export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  language: 'zh' | 'en' | 'ja'
  autoSave: boolean
  notifications: boolean
  maxFileSize: number
  defaultParameters: Record<string, any>
}

/**
 * Notification types
 */
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  actions?: Array<{
    label: string
    action: () => void
  }>
  createdAt: Date
}

/**
 * Navigation menu types
 */
export interface NavItem {
  id: string
  label: string
  href: string
  icon?: string
  badge?: string
  children?: NavItem[]
  external?: boolean
}

/**
 * Page metadata types
 */
export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
}

/**
 * Feature types
 */
export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  category: string
  highlighted?: boolean
}

/**
 * Statistics types
 */
export interface Statistics {
  totalUsers: number
  totalFiles: number
  totalProcesses: number
  successRate: number
  averageProcessingTime: number
}

/**
 * FAQ types
 */
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  helpful: number
  notHelpful: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Example types
 */
export interface Example {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  input: any
  output: any
  parameters: Record<string, any>
  tags: string[]
  previewImage?: string
  featured?: boolean
}

/**
 * Changelog types
 */
export interface Changelog {
  id: string
  version: string
  date: Date
  type: 'major' | 'minor' | 'patch'
  changes: Array<{
    type: 'feature' | 'improvement' | 'bugfix' | 'breaking'
    description: string
  }>
  breaking?: boolean
}

/**
 * Contact form types
 */
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  type: 'bug' | 'feature' | 'question' | 'other'
}

/**
 * Search result types
 */
export interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'feature' | 'faq' | 'example'
  relevance: number
}

/**
 * Theme type
 */
export type Theme = 'light' | 'dark' | 'system'

/**
 * Language type
 */
export type Language = 'zh' | 'en' | 'ja'

/**
 * Device type
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Error type
 */
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
  userId?: string
  sessionId?: string
  url?: string
  userAgent?: string
}

/**
 * Performance metrics type
 */
export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionTime: number
  memoryUsage: number
  networkLatency: number
  errorRate: number
}
