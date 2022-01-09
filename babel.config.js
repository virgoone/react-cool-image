module.exports = () => ({
  env: {
    development: {
      plugins: [require.resolve('@emotion/babel-plugin')],
    },
  },
})
