import { CDNType, CDNFormat } from './types'

let support: boolean | undefined
let cdn: CDNType = 'ali'

const formatQuery: { [key: string]: CDNFormat } = {
  ali: {
    thumb: '?x-oss-process=image/resize,p_15',
    thumbWebp: '?x-oss-process=image/resize,p_15/format,webp',
    formatWebp: '?x-oss-process=image/format,webp',
    hasQuery: /^x-oss-process/,
  },
  qiniu: {
    thumb: '?imageMogr2/thumbnail/!15p',
    thumbWebp: '?imageMogr2/thumbnail/!15p/format/webp',
    formatWebp: '?imageMogr2/format/webp',
    hasQuery: /^(imageMogr2|imageView2)/,
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
 * @returns [thumbSrc, originSrc]
 */
export const processImageFormat = (
  src: string,
  webp = true,
  process = true,
): [string, string] => {
  const [base, qs] = src.split('?')

  if (!cdn || !process) {
    return [src, src]
  }

  const format = formatQuery[cdn]
  const { hasQuery, thumb, thumbWebp, formatWebp } = format
  const hasFormat = hasQuery?.test(qs)

  if (hasFormat) {
    console.warn(
      '%c<Image /> %c组件会根据webp支持情况自动切换图片格式，因已设置format，不再进行切换',
      'font-weight: bold;',
      'font-weight: normal;',
    )
    return [src, src]
  }
  const thumbSrc = `${base}${webp ? thumbWebp : thumb}${qs ? `&${qs}` : ''}`
  const originSrc = webp ? `${base}${formatWebp}${qs ? `&${qs}` : ''}` : src

  return [thumbSrc, originSrc]
}
