import { css } from '@emotion/css'

export const image = css`
  position: relative;
  background-color: transparent;
  overflow: hidden;

  img {
    width: 100%;
    display: block;
    position: static;
    opacity: 0;
    transition: opacity 1s linear;
  }
`

export const placeholder = css`
  position: relative;

  img {
    position: absolute;
    left: 0;
    top: 0;
  }
`

export const thumbnail = css`
  filter: blur(20px);
  opacity: 1 !important;
`
export const loaded = css`
  img {
    opacity: 1;
  }
`
