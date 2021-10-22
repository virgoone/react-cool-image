/* eslint-disable */
module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      browsers: 'last 2 versions',
      stage: 3,
    }),
    require('cssnano')({
      preset: [
        'default',
        {
          mergeLonghand: false,
        },
      ],
    }),
  ],
}
