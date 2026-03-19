import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface BlurTextProps {
  text: string
  className?: string
  delayBase?: number
}

export function BlurText({ text, className, delayBase = 0 }: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const usesWordSplit = text.trim().includes(' ')
  const segments = usesWordSplit ? text.split(' ') : Array.from(text)

  useEffect(() => {
    const node = elementRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={cn('section-heading flex flex-wrap justify-center', !usesWordSplit && 'gap-x-[0.06em]', className)}
      aria-label={text}
    >
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          className={cn('overflow-hidden', usesWordSplit && 'pr-[0.32em] last:pr-0')}
        >
          <motion.span
            initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
            animate={
              isVisible
                ? {
                    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                    opacity: [0, 0.5, 1],
                    y: [50, -5, 0],
                  }
                : undefined
            }
            transition={{
              duration: 0.35,
              delay: delayBase + index * 0.1,
              ease: 'easeOut',
              times: [0, 0.65, 1],
            }}
            className="inline-block"
          >
            {segment}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
