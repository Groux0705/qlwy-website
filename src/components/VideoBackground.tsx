import { useEffect, useRef } from 'react'
import Hls from 'hls.js/dist/hls.light.mjs'
import { cn } from '@/lib/utils'

interface VideoBackgroundProps {
  src: string
  poster?: string
  desaturated?: boolean
  className?: string
  videoClassName?: string
}

export function VideoBackground({
  src,
  poster,
  desaturated,
  className,
  videoClassName,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    const tryPlay = () => {
      void video.play().catch(() => undefined)
    }

    if (src.endsWith('.m3u8')) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
        video.addEventListener('loadedmetadata', tryPlay)
      } else if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true })
        hls.loadSource(src)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, tryPlay)
      }
    } else {
      video.src = src
      video.addEventListener('loadedmetadata', tryPlay)
    }

    return () => {
      video.pause()
      video.removeEventListener('loadedmetadata', tryPlay)
      hls?.destroy()
    }
  }, [src])

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        className={cn('absolute inset-0 h-full w-full object-cover', videoClassName)}
        style={desaturated ? { filter: 'saturate(0)' } : undefined}
      />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  )
}
