import React, { FC } from 'react'
import { Image } from '../../src'
import { CardClass, ContainerClass } from './style'

const BasicExample: FC = () => (
  <div className={ContainerClass}>
    <div className={CardClass}>
      <Image
        width={592}
        height={352}
        src="https://dounione.oss-cn-shanghai.aliyuncs.com/blog/5b1a7ecd5b4e1.jpg"
      />
    </div>
    <div className={CardClass}>
      <Image
        width={592}
        height={352}
        src="https://dounione.oss-cn-shanghai.aliyuncs.com/blog/5b1a7ecd5b4e1.jpg"
      />
    </div>
  </div>
)

export default BasicExample
