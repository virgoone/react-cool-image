/*  eslint-disable compat/compat, @typescript-eslint/no-unused-vars */

import Imager from '../imager'

describe('Imager', () => {
  // @ts-expect-error
  Imager.prototype.clearImgSrc = jest.fn()

  const FAILURE_SRC = 'FAILURE_SRC'
  const SUCCESS_SRC = 'SUCCESS_SRC'
  const ERROR_EVT = { mock: '' }
  const LOAD_EVT = { mock: '' }

  interface E {
    src?: string
    crossOrigin?: string
    onError?: (event: Event) => void
    onLoad?: (event: Event) => void
  }
  interface Return {
    load: (e?: E) => void
    unload: () => void
  }

  const createImage = (instance: Imager): Return => ({
    load: ({
      src = SUCCESS_SRC,
      onError = () => null,
      onLoad = () => null,
      crossOrigin,
    }: E = {}) => {
      instance.load(src, onError, onLoad, crossOrigin)
    },
    unload: () => {
      instance.unload()
    },
  })

  beforeAll(() => {
    // @ts-expect-error
    global.Image = jest.fn(() => {
      let crossOrigin = ''
      let src = ''

      return {
        // @ts-expect-error
        onerror: (e: any) => null,
        // @ts-expect-error
        onload: (e: any) => null,
        decode: jest.fn(() => Promise.resolve()),
        set src(val: string) {
          if (val === FAILURE_SRC) setTimeout(() => this.onerror(ERROR_EVT))
          if (val === SUCCESS_SRC) setTimeout(() => this.onload(LOAD_EVT))

          src = val
        },
        get src(): string {
          return src
        },
        set crossOrigin(val) {
          crossOrigin = val
        },
        get crossOrigin(): string {
          return crossOrigin
        },
      }
    })
  })

  afterEach(() => {
    // @ts-expect-error
    global.Image.mockClear()
  })

  it('should call onLoad', () =>
    new Promise((resolve) => {
      const image = createImage(new Imager())
      const onError = jest.fn()
      const onLoad = (event: Event) => {
        expect(event).toMatchObject(LOAD_EVT)
        // @ts-expect-error
        resolve()
      }

      image.load({ onError, onLoad })

      expect(onError).not.toHaveBeenCalled()
    }))

  it('should set crossOrigin correctly', () => {
    const imager = new Imager()
    const image = createImage(imager)

    image.load()

    // @ts-expect-error
    expect(imager.img.crossOrigin).toBe('')

    const crossOrigin = 'anonymous'

    image.load({ crossOrigin })

    setTimeout(() => {
      // @ts-expect-error
      expect(imager.img.crossOrigin).toBe(crossOrigin)
    })
  })

  it('should clear img.src and reset variables', () => {
    const imager = new Imager()
    const image = createImage(imager)

    image.load({ src: FAILURE_SRC })

    // @ts-expect-error
    expect(imager.img.onerror).not.toBeNull()
    // @ts-expect-error
    expect(imager.img.onload).not.toBeNull()
    // @ts-expect-error
    expect(imager.img.src).toBe(FAILURE_SRC)
    // @ts-expect-error
    expect(imager.img).not.toBeNull()
    image.unload()

    // @ts-expect-error
    expect(imager.clearImgSrc).toHaveBeenCalled()
    // @ts-expect-error
    expect(imager.img).toBeNull()
  })
})
