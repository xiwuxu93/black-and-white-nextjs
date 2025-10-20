'use client'

import { Button } from '@/components/ui/button'
import { Share2, Link as LinkIcon } from 'lucide-react'

interface BlogInteractionsProps {
  postId: string
}

export function BlogInteractions({ postId }: BlogInteractionsProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href
        })
      } catch (err) {
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            alert('Link copied to clipboard!')
          }}
        >
          <LinkIcon className="w-4 h-4 mr-2" />
          Copy Link
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}
