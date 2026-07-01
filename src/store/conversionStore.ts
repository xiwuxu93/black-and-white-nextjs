import { create } from 'zustand'

export interface ConversionData {
  fileUrl: string // Object URL pointing to the processed blob
  filename: string
  fileType: 'image' | 'pdf'
  originalSize: string // e.g. "2.4" MB
  processedSize: string // e.g. "1.1" MB
}

interface ConversionState {
  data: ConversionData | null
  setConversionData: (data: ConversionData) => void
  clearConversionData: () => void
}

export const useConversionStore = create<ConversionState>((set) => ({
  data: null,
  setConversionData: (data) => set({ data }),
  clearConversionData: () => {
    set((state) => {
      // Revoke the Object URL to free up browser memory
      if (state.data?.fileUrl) {
        try {
          URL.revokeObjectURL(state.data.fileUrl)
        } catch (e) {
          console.error('Failed to revoke object URL:', e)
        }
      }
      return { data: null }
    })
  },
}))
