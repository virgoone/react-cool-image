import React, { FC } from 'react'
import { css } from '@emotion/css'
import Image from '../src'
import 'normalize.css'

const App: FC = () => (
  <div
    className={css`
      position: relative;
      overflow: hidden;
    `}
  >
    <h1
      className={css`
        text-align: center;
        font-size: 20px;
      `}
    >
      一个动画友好的懒加载图片组件
    </h1>
    <main
      id="main"
      className={css`
        width: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      <div
        className={css`
          width: 100%;
          max-width: 700px;
        `}
      >
        <div
          className={css`
            width: 100%;
            margin-bottom: 10px;
          `}
        >
          <Image
            width={592}
            height={352}
            src="https://dounione.oss-cn-shanghai.aliyuncs.com/blog/5b1a7ecd5b4e1.jpg"
          />
        </div>

        <div
          className={css`
            width: 100%;
            margin-bottom: 10px;
          `}
        >
          <Image
            width={592}
            height={352}
            src="https://dounione.oss-cn-shanghai.aliyuncs.com/blog/5b1a7ecd5b4e1.jpg"
          />
        </div>
        <div
          className={css`
            width: 100%;
            margin-bottom: 10px;
          `}
        >
          <Image
            width={592}
            height={352}
            src="https://dounione.oss-cn-shanghai.aliyuncs.com/blog/5b1a7ecd5b4e1.jpg"
          />
        </div>
        <div
          className={css`
            width: 100%;
            margin-bottom: 10px;
          `}
        >
          <Image
            width={592}
            height={352}
            src="https://dounione.oss-cn-shanghai.aliyuncs.com/blog/5b1a7ecd5b4e1.jpg"
            lazy="thumb"
          />
        </div>
        <div
          className={css`
            width: 100%;
            margin-bottom: 10px;
          `}
        >
          <Image
            width={592}
            height={352}
            src="https://dounione.oss-cn-shanghai.aliyuncs.com/blog/5b1a7ecd5b4e1.jpg"
          />
        </div>
        <div
          className={css`
            width: 100%;
            margin-bottom: 10px;
          `}
        >
          <Image
            width={592}
            height={352}
            src="https://dounione.oss-cn-shanghai.aliyuncs.com/blog/5b1a7ecd5b4e1.jpg"
          />
        </div>
        <div
          className={css`
            text-align: center;
            padding: 15px 0;
          `}
        >
          到底了～
        </div>
      </div>
    </main>
  </div>
)

export default App
