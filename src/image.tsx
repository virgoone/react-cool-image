import React, {
  MutableRefObject,
  useState,
  useEffect,
  forwardRef,
  useRef,
} from 'react'
import useInView from 'react-cool-inview'
import Imager from './imager'
import { ImageProps } from './types'
import { supportsWebp, processImageFormat } from './utils'
import useLatest from './useLatest'

const DEFAULT_SRC =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

const Image = forwardRef((props: ImageProps, ref) => {
  const {
    width,
    height,
    src,
    error,
    placeholder,
    crossOrigin,
    className,
    observerOptions = {},
    lazy = true,
    format = true,
    onError,
    onLoad,
    ...rest
  } = props
  const [source, setSource] = useState(placeholder || DEFAULT_SRC)
  const [thumbnail, setThumbnail] = useState<string>('')
  const [loaded, setLoaded] = useState<boolean>(false)
  const imagerRef = useRef<Imager>(new Imager())
  const sourceRef = useRef<string>(src)
  const onErrorRef = useLatest(onError)
  const onLoadRef = useLatest(onLoad)

  const { observe, inView } = useInView<HTMLDivElement>({
    rootMargin: '20px',
    unobserveOnEnter: true,
    ...observerOptions,
  })

  const setRef = (el: HTMLImageElement) => {
    if (!el) return

    observe(el)
    // eslint-disable-next-line no-param-reassign
    if (ref) (ref as MutableRefObject<HTMLDivElement>).current = el
  }
  useEffect(() => {
    if (!src) {
      setSource(placeholder || DEFAULT_SRC)
      return () => null
    }
    if ((!inView && lazy) || (sourceRef.current === src && loaded)) {
      return () => null
    }

    const { current: imager } = imagerRef

    supportsWebp((support) => {
      const urls = processImageFormat(src, support, format)
      const [thumbSource, originSource] = urls

      if (lazy === 'thumb') {
        imager.load(
          thumbSource,
          () => {
            setThumbnail('')
          },
          () => {
            setThumbnail(thumbSource)
          },
          crossOrigin,
        )
      }

      imager.load(
        originSource,
        (e) => {
          setThumbnail('')
          setSource((prevSrc) => error || placeholder || prevSrc)
          if (onErrorRef.current) onErrorRef.current(e)
        },
        (e) => {
          setLoaded(true)
          setSource(originSource)
          sourceRef.current = src
          if (onLoadRef.current) onLoadRef.current(e)
        },
        crossOrigin,
      )
    })

    return () => imager.unload()
  }, [
    inView,
    crossOrigin,
    src,
    lazy,
    format,
    loaded,
    source,
    placeholder,
    onErrorRef,
    onLoadRef,
    error,
  ])

  const filling = !!(width && height)
  const style = filling ? { paddingTop: `${(height / width) * 100}%` } : {}
  const classNames = [
    'react-cool-image',
    filling && 'filling',
    loaded && 'loaded',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classNames} data-loaded={loaded} style={style} ref={setRef}>
      {thumbnail && <img crossOrigin={crossOrigin} src={thumbnail} />}
      <img crossOrigin={crossOrigin} src={source} {...rest} />
    </div>
  )
})

Image.displayName = 'Image'

export default Image
