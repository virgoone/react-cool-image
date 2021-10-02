# <em><b>React 图片组件 </b></em>

动画友好的图片组件，支持懒加载、默认图片显示、错误回退等，使用 `七牛` 和 `阿里云` 存储做图片格式优化，默认加载 `webp` 格式，使用 [`react-cool-inview`](https://github.com/wellyshen/react-cool-inview) 做懒加载方案，具体参考 [`Intersection Observer`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

[![npm version](https://img.shields.io/npm/v/react-cool-image?style=flat-square)](https://www.npmjs.com/package/react-cool-image)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-image?style=flat-square)](https://www.npmtrends.com/react-cool-image)
[![gzip size](https://badgen.net/bundlephobia/minzip/react-cool-image?label=gzip%20size&style=flat-square)](https://bundlephobia.com/result?p=react-cool-image)

## Requirement

It requires `react v16.8+`.

## Installation

This package is distributed via [npm](https://www.npmjs.com/package/react-cool-image).

```sh
$ yarn add react-cool-image
# or
$ npm install --save react-cool-image
```

## Quick Start

```js
import Image from 'react-cool-image'

const App = () => <Image width={300} height={100} src="https://xxx.png" />
```

## API

支持 **lazy-load**，**progressive image loading**（带虚化效果），如果浏览器支持 **webp**，会自动使用 **webp** 格式的图片。

| Prop            | Type              | Default | Description                                                                                                                                                  |
| --------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src`           | string            |         | 图片地址 It's `required`. <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                    |
| `placeholder`   | string            |         | Placeholder image source. <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                    |
| `webp`          | boolean           | true    | 是否使用 webp                                                                                                                                                |
| `format`        | boolean           | true    | 是否使用 **CDN** 格式化                                                                                                                                      |
| `width`         | number            |         | 宽度 单位 **px**                                                                                                                                             |
| `height`        | number            |         | 高度，单位 **px**                                                                                                                                            |
| `lazy`          | boolean \| string | `true`  | Turn on/off lazy loading. <br />目前可选值`boolean`                                                                                                          |
| observerOptions | object            | `{}`    | See the [ObserverOptions](#observerOptions) section.                                                                                                         |
| `...`           |                   |         | Find more [props](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes) and [events](https://reactjs.org/docs/events.html#image-events). |

## Attention

- 当 **lazy** 为 `thumb` 地址时才会有**缩略图虚化**效果
- **format** 为 `true` 时，或者 **src** 包含图片格式化参数时，**format** 默认不起作用
- **width**，**height** 并不是图片最终的宽高。只是该组件用来计算 **placeholder** 宽高的基数。 计算公式为 宽 = 父元素的宽，高 = 宽 \* (height / width)
- 如果 **lazy** 不为空，**width** 与 **height** 是建议设置的

### observerOptions

默认值

```json
{
  rootMargin: 20px,
  unobserveOnEnter: true
}
```

其他参数参考：[`react-cool-inview`](https://github.com/wellyshen/react-cool-inview#api)
