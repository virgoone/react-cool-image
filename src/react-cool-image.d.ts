declare module 'react-cool-image' {
  import {
    DetailedHTMLProps,
    ImgHTMLAttributes,
    SyntheticEvent,
    ForwardRefExoticComponent,
  } from 'react'

  export interface ImageProps
    extends DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > {
    src: string
    className?: string
    width?: number
    height?: number
    format?: boolean
    webp?: boolean
    lazy?: boolean | 'thumb'
    crossOrigin?: '' | 'anonymous' | 'use-credentials'
    onError?: (event: SyntheticEvent | Event) => void
    onLoad?: (event: SyntheticEvent | Event) => void
  }

  const Image: ForwardRefExoticComponent<ImageProps>

  export default Image
}
