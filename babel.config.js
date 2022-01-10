module.exports = () => ({
  overrides: true,
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  env: {
    development: {
      plugins: [require.resolve('@emotion/babel-plugin')],
    },
  },
})
