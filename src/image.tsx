import {
  MutableRefObject,
  useState,
  useEffect,
  forwardRef,
  useRef,
  CSSProperties,
} from 'react'
import useInView from 'react-cool-inview'
import Imager from './imager'
import { ImageProps } from './types'
import { supportsWebp, processImageFormat } from './utils'

const DEFAULT_SRC =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
const Image = forwardRef((props: ImageProps, ref) => {
  const {
    width,
    height,
    src,
    placeholder,
    crossOrigin,
    className,
    observerOptions = {},
    lazy = true,
    format = true,
    ...rest
  } = props
  const [source, setSource] = useState(placeholder || DEFAULT_SRC)
  const [thumbnail, setThumbnail] = useState<string>('')
  const [loaded, setLoaded] = useState<boolean>(false)
  const imagerRef = useRef<Imager>(new Imager())
  const sourceRef = useRef<string>(src)

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
        () => {
          setThumbnail('')
          setSource((prevSrc) => src || prevSrc)
        },
        () => {
          setLoaded(true)
          setSource(originSource)
          sourceRef.current = src
        },
        crossOrigin,
      )
    })

    return () => imager.unload()
  }, [inView, crossOrigin, src, lazy, format, loaded, source, placeholder])

  const filling = !!(width && height)
  const style = filling ? { paddingTop: `${(height / width) * 100}%` } : {}
  const imageStyle: CSSProperties = filling
    ? { position: 'absolute', left: 0, top: 0 }
    : { position: 'static' }

  return (
    <div
      className={className}
      data-loaded={loaded}
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        ...style,
      }}
      ref={setRef}
    >
      {thumbnail && (
        <img
          style={
            {
              '-webkit-filter': 'blur(20px)',
              filter: 'blur(20px)',
              opacity: 1,
            } as CSSProperties
          }
          crossOrigin={crossOrigin}
          src={thumbnail}
        />
      )}
      <img
        crossOrigin={crossOrigin}
        src={source}
        style={
          {
            width: '100%',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1s linear',
            '-webkit-transition': 'opacity 1s linear',
            ...imageStyle,
          } as CSSProperties
        }
        {...rest}
      />
    </div>
  )
})

Image.displayName = 'Image'

export default Image
