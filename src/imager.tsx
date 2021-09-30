export default class Imager {
  private img: HTMLImageElement | null = null

  load(
    src: string,
    onError: (event: Event) => void,
    onLoad: (event: Event) => void,
    crossOrigin?: string,
  ): void {
    this.img = new Image()
    this.img.src = src
    if (crossOrigin) this.img.crossOrigin = crossOrigin

    // @ts-expect-error
    this.img.onerror = (event: Event) => onError(event)
    this.img.onload = (event: Event) => onLoad(event)
  }

  unload(): void {
    if (this.img) {
      this.img.onerror = null
      this.img.onload = null
      this.clearImgSrc()
      this.img = null
    }
  }

  private clearImgSrc() {
    ;(this.img as HTMLImageElement).src = ''
    try {
      // @ts-ignore
      delete (this.img as HTMLImageElement).src
    } catch (error) {
      // Ignore the error of deleting object properties in Safari strict mode
    }
  }
}
