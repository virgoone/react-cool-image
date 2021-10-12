module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        loose: true,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ]
  const plugins = []
  return {
    presets,
    plugins,
    env: {
      development: {
        plugins: ['@emotion'],
      },
    },
  }
}
