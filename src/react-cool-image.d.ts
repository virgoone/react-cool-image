declare module 'react-cool-image' {
  import {
    DetailedHTMLProps,
    ImgHTMLAttributes,
    SyntheticEvent,
    ForwardRefExoticComponent
  } from 'react'

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

  export const Image: ForwardRefExoticComponent<ImageProps>

  export const supportsWebp: (
    callback: (support?: boolean | undefined) => void
  ) => void

  export const processImageFormat: (
    src: string,
    webp?: boolean,
    format?: boolean | Format
  ) => [string, string]

  export default Image
}
