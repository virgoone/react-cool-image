import React, { FC } from 'react'
import { css } from '@emotion/css'
import Image from '../../src'

const BasicExample: FC = () => (
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
  </div>
)

export default BasicExample
