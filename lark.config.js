// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  variables: {
    APP_TITLE: 'React Cool Image',
    SENTRY_DSN: undefined,
  },
  // 可选，默认值 ./src/index.tsx
  paths: {
    appIndex: resolve('./demo/index.tsx'),
    // 可选，默认值 ./src
    appSrc: resolve('./'),
    // 可选，默认值 ./dist
    appBuild: resolve('./build'),
    appHtml: resolve('./demo/index.html'),
  },
}
