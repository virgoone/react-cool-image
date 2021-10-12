import { CDNType, Format } from './types'

let support: boolean | undefined
let cdn: CDNType = 'ali'

const formatQuery: { [key: string]: Format } = {
  ali: {
    thumb: 'x-oss-process=image/resize,p_15',
    thumbWebp: 'x-oss-process=image/resize,p_15/format,webp',
    webp: 'x-oss-process=image/format,webp',
    hasFormat: /^x-oss-process/,
  },
  qiniu: {
    thumb: 'imageMogr2/thumbnail/!15p',
    thumbWebp: 'imageMogr2/thumbnail/!15p/format/webp',
    webp: 'imageMogr2/format/webp',
    hasFormat: /^(imageMogr2|imageView2)/,
  },
}

export function supportsWebp(cb: (isSupport?: boolean) => void): void {
  if (support !== undefined) {
    cb(support)
    return
  }

  const webp = new Image()

  webp.src =
    'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='
  // eslint-disable-next-line
  webp.onload = webp.onerror = () => {
    support = webp.height === 1
    // eslint-disable-next-line no-unused-expressions
    !support && console.error('webp support', support)
    cb(support)
  }
}

/**
 * 全局设置图片格式化 CDN 地址
 * @param type 需要设置的 CDN 类型
 */
export const setupType = (type: CDNType): void => {
  cdn = type
}

/**
 * 处理文件格式，返回经 CDN 处理过的地址
 * @param src 图片地址
 * @param webp 是否使用 webp 格式
 * @param format boolean ｜ Format
 * @returns [thumbSrc, originSrc]
 */
export const processImageFormat = (
  src: string,
  webp = true,
  format: boolean | Format = true,
): [string, string] => {
  const [base, qs] = src.split('?')

  if (!cdn || !format) {
    return [src, src]
  }
  const query = typeof format !== 'boolean' ? format : formatQuery[cdn]

  const { hasFormat, thumb, thumbWebp, webp: formatWebp } = query
  const isFormat = hasFormat?.test(qs)

  if (isFormat) {
    console.warn(
      '因已设置 %cformat,%c不再进行自动切换图片格式',
      'font-weight: bold;',
      'font-weight: normal;',
    )
    return [src, src]
  }
  const thumbSrc =
    thumbWebp || thumb ? `${base}?${webp ? thumbWebp : thumb}` : src
  const originSrc =
    webp && formatWebp ? `${base}?${formatWebp}${qs ? `&${qs}` : ''}` : src

  return [thumbSrc, originSrc]
}
