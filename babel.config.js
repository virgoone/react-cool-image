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
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ]
  const plugins = [
    [
      '@emotion',
      {
        // sourceMap is on by default but source maps are dead code eliminated in production
        autoLabel: 'dev-only',
        labelFormat: '[local]',
      },
    ],
  ]
  return {
    presets,
    plugins,
  }
}
