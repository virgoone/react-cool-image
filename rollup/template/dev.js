// eslint-disable-next-line
export default ({ files }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://dounione.oss-cn-shanghai.aliyuncs.com" rel="preconnect" crossorigin>
      <link rel="stylesheet" href=${files.css[0].fileName} />
      <title>React Cool Image</title>
      <meta name="keyword" content="lazy-loading,React Cool Image,图片组件,React,动画友好,Image,懒加载,骨骼动画">
      <meta name="description" content="一个动画特别特别友好的图片懒加载组件">
    </head>
    <body>
      <div id="app"></div>
      <script defer src="https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js"></script>
      <script defer src="https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
      
      <script defer type="text/javascript" src=${files.js[0].fileName}></script>
    </body>
  </html>
`
// <script defer src="https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.development.js"></script>
// <script defer src="https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.development.js"></script>
// <script defer src="https://cdn.jsdelivr.net/npm/@geist-ui/react@2.2.0/dist/index.min.js"></script>
