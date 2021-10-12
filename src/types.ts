import { DetailedHTMLProps, ImgHTMLAttributes, SyntheticEvent } from 'react'
import { Options } from 'react-cool-inview'

export type CDNType = 'ali' | 'qiniu' | ''

export interface Format {
  thumb?: string
  thumbWebp?: string
  webp?: string
  hasFormat?: RegExp
}

export interface ImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string
  placeholder?: string
  error?: string
  className?: string
  width?: number
  height?: number
  webp?: boolean
  lazy?: boolean | 'thumb'
  format?: boolean | Format
  observerOptions?: Options<HTMLDivElement>
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
  onError?: (event: SyntheticEvent | Event) => void
  onLoad?: (event: SyntheticEvent | Event) => void
}
