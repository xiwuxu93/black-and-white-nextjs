// TypeScript types related to image processing

export interface ImageFilter {
  contrast: number;
  brightness: number;
  sepia: number;
  grain: number;
  shadows: number;
  highlights: number;
  invert: boolean;
  grayscale: boolean;
}

export interface PresetConfig extends ImageFilter {
  name: string;
  displayName: string;
}

export interface ProcessingOptions extends ImageFilter {
  type: 'preview' | 'final';
}

export interface WorkerMessage {
  imageData: ImageData;
  type: 'preview' | 'final';
  contrast: number;
  brightness: number;
  sepia: number;
  grain: number;
  shadows: number;
  highlights: number;
  invert: boolean;
  grayscale: boolean;
}

export interface WorkerResponse {
  processedImageData: ImageData;
  type: 'preview' | 'final';
}

export interface BatchWorkerMessage {
  imageData: ImageData;
  preset: ImageFilter;
  fileIdentifier: string;
}

export interface BatchWorkerResponse {
  processedImageData: ImageData;
  fileIdentifier: string;
}

export interface OriginalFileInfo {
  name: string;
  baseName: string;
  extension: string;
  mimeType: string;
  size: number;
}

export interface ProcessedImage {
  id: string;
  originalFile: File;
  originalInfo: OriginalFileInfo;
  selectedFormat: DownloadFormat;
  processedData?: ImageData;
  processingStatus: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  originalPreviewUrl?: string;
  processedPreviewUrl?: string;
}

export interface DownloadFormat {
  value: 'png' | 'jpeg' | 'webp';
  label: string;
  mimeType: string;
}

export const DOWNLOAD_FORMATS: DownloadFormat[] = [
  { value: 'png', label: 'PNG', mimeType: 'image/png' },
  { value: 'jpeg', label: 'JPEG', mimeType: 'image/jpeg' },
  { value: 'webp', label: 'WebP', mimeType: 'image/webp' }
];

export const DEFAULT_PRESETS: Record<string, PresetConfig> = {
  default: {
    name: 'default',
    displayName: 'Default',
    contrast: 0,
    brightness: 100,
    sepia: 0,
    grain: 0,
    shadows: 0,
    highlights: 0,
    invert: false,
    grayscale: true,
  },
  dramatic: {
    name: 'dramatic',
    displayName: 'Dramatic',
    contrast: 60,
    brightness: 90,
    sepia: 0,
    grain: 5,
    shadows: -20,
    highlights: 10,
    invert: false,
    grayscale: true,
  },
  soft: {
    name: 'soft',
    displayName: 'Soft',
    contrast: -20,
    brightness: 110,
    sepia: 0,
    grain: 0,
    shadows: 10,
    highlights: -5,
    invert: false,
    grayscale: true,
  },
  vintage: {
    name: 'vintage',
    displayName: 'Vintage',
    contrast: 20,
    brightness: 95,
    sepia: 25,
    grain: 15,
    shadows: 5,
    highlights: 0,
    invert: false,
    grayscale: true,
  },
  'high-contrast': {
    name: 'high-contrast',
    displayName: 'High Contrast',
    contrast: 80,
    brightness: 100,
    sepia: 0,
    grain: 0,
    shadows: -30,
    highlights: 20,
    invert: false,
    grayscale: true,
  },
  'film-noir': {
    name: 'film-noir',
    displayName: 'Film Noir',
    contrast: 50,
    brightness: 80,
    sepia: 0,
    grain: 20,
    shadows: -25,
    highlights: 15,
    invert: false,
    grayscale: true,
  },
};
