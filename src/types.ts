import { DetailedHTMLProps, ImgHTMLAttributes, SyntheticEvent } from 'react'
import { Options } from 'react-cool-inview'

export type CDNType = 'ali' | 'qiniu' | ''

export interface CDNFormat {
  thumb?: string
  thumbWebp?: string
  formatWebp?: string
  hasQuery?: RegExp
}

export interface ImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string
  placeholder?: string
  className?: string
  width?: number
  height?: number
  format?: boolean
  webp?: boolean
  lazy?: boolean | 'thumb'
  observerOptions?: Options<HTMLDivElement>
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
  onError?: (event: SyntheticEvent | Event) => void
  onLoad?: (event: SyntheticEvent | Event) => void
}
