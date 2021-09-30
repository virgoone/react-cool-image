import { setupType, processImageFormat } from '../utils'

describe('utils', () => {
  const src = 'https://xxx.cdn.png'

  afterEach(() => {
    setupType('ali')
  })

  // eslint-disable-next-line jest/no-commented-out-tests
  // describe('when webp is supported', () => {
  //   it('returns true after update', async () => {
  //     function callback(isSupport: boolean) {
  //       expect(isSupport).toBe(true)
  //     }
  //   })
  // })

  it('should process image format', () => {
    const imageFormats = processImageFormat(src)

    imageFormats.forEach((format) => {
      expect(format).toContain('x-oss-process')
    })
  })

  it('should process image format(qiniu)', () => {
    setupType('qiniu')
    const imageFormats = processImageFormat(src)

    imageFormats.forEach((format) => {
      expect(format).toContain('imageMogr2')
    })
  })

  it('should`t process image format', () => {
    setupType('')
    const imageFormats = processImageFormat(src)

    imageFormats.forEach((format) => {
      expect(format).toEqual(src)
    })
  })

  it('should`t process image format when format exists', () => {
    const processSrc = `${src}?x-oss-process=xxx`
    const imageFormats = processImageFormat(processSrc)

    imageFormats.forEach((format) => {
      expect(format).toEqual(processSrc)
    })
  })
})
