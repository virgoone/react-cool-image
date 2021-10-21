import React, { FC } from 'react'
import { css } from '@emotion/css'
import { TitleClass } from './components/style'

import 'normalize.css'
import '../src/style.scss'
import BasicExample from './components/basic'

const App: FC = () => (
  <div
    className={css`
      position: relative;
      overflow: hidden;
    `}
  >
    <h1 className={TitleClass}>一个动画友好的懒加载图片组件</h1>
    <BasicExample />
  </div>
)

export default App
