import React, { FC, useEffect, useState } from 'react'
import { Global, css } from '@emotion/react'
import {
  CssBaseline,
  GeistProvider,
  useTheme,
  Text,
  Grid,
  Spacer,
  Dot,
  Tabs,
  Snippet,
  Card,
  Link,
} from '@geist-ui/react'
import { ContentClass, LogoClass } from './components/style'

import 'normalize.css'
import '../src/style.scss'
import BasicExample from './example/basic'

const App: FC = () => {
  const theme = useTheme()
  const [themeType, setThemeType] = useState<string>()

  useEffect(() => {
    const themeCache = window.localStorage.getItem('theme')
    if (themeCache !== 'dark') return
    setThemeType('dark')
  }, [])

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <div className={ContentClass}>
        <Grid.Container gap={2} justify="center">
          <Spacer h={2} />
          <Grid xs={24} md={24} direction="column">
            <Text h1 em className={LogoClass}>
              React Cool Image
            </Text>
            <Text p b>
              动画友好的图片组件，支持懒加载、默认图片显示、错误回退
              <Spacer w={0.5} />
              <Link
                href="https://github.com/virgoone/react-cool-image"
                target="_blank"
                onClick={() => window?.gtag?.('event', 'go_to_github')}
                icon
              >
                Github
              </Link>
              <Link
                href="https://www.npmjs.com/package/react-cool-image"
                target="_blank"
                onClick={() => window?.gtag?.('event', 'go_to_npm')}
                icon
              >
                Npm
              </Link>
            </Text>
          </Grid>
          <Spacer h={1} />
          <Grid xs={24} md={24} justify="center" direction="row">
            <div>
              <Dot type="success" /> 1. 运行命令:
              <Spacer h={0.8} />
              <Tabs initialValue="yarn" hideDivider>
                <Tabs.Item label="Yarn" value="yarn">
                  <Snippet width="400px">yarn add react-cool-image</Snippet>
                </Tabs.Item>
                <Tabs.Item label="Npm" value="npm">
                  <Snippet width="400px">
                    npm install --save react-cool-image
                  </Snippet>
                </Tabs.Item>
              </Tabs>
              <Spacer h={2} />
              <Dot type="success" /> 2. 使用组件
              <Spacer h={0.8} />
              <Snippet
                width="400px"
                text={[
                  `import Image from 'react-cool-image'`,
                  `import 'react-cool-image/dist/style.less'`,
                  ``,
                  'const App = () => <Image width={300} height={100} src="https://xxx.png" />',
                ]}
              />
              <Spacer h={2} />
              <Dot type="success" /> 3. 效果展示
              <Spacer h={0.8} />
              <Card>
                <BasicExample />
              </Card>
            </div>
          </Grid>
          <Spacer h={2} />
        </Grid.Container>
      </div>
      <Global
        styles={css`
          html {
            --geist-page-nav-height: 60px;
            --geist-page-tab-height: 48px;
          }

          .tag {
            color: ${theme.palette.accents_5};
          }

          .punctuation {
            color: ${theme.palette.accents_5};
          }

          .attr-name {
            color: ${theme.palette.accents_6};
          }

          .attr-value {
            color: ${theme.palette.accents_4};
          }

          .language-javascript {
            color: ${theme.palette.accents_4};
          }

          span.class-name {
            color: ${theme.palette.warning};
          }

          span.maybe-class-name {
            color: ${theme.palette.purple};
          }

          span.token.string {
            color: ${theme.palette.accents_5};
          }

          span.keyword {
            color: ${theme.palette.success};
          }

          span.plain-text {
            color: ${theme.palette.accents_3};
          }

          body::-webkit-scrollbar {
            width: 0;
            background-color: ${theme.palette.accents_1};
          }

          body::-webkit-scrollbar-thumb {
            background-color: ${theme.palette.accents_2};
            border-radius: ${theme.layout.radius};
          }
        `}
      />
    </GeistProvider>
  )
}

export default App
