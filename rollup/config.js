import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import url from '@rollup/plugin-url'
import postcss from 'rollup-plugin-postcss'
import html from '@rollup/plugin-html'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { visualizer } from 'rollup-plugin-visualizer'

import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import pkg from '../package.json'
import templateDev from './template/dev'
import templatePro from './template/pro'

const { BUILD } = process.env

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}
const isDev = BUILD === 'dev'
const isDemo = BUILD === 'demo'
const isDist = BUILD === 'dist'

const cjs = {
  file: isDist ? pkg.main : '.dev/bundle.js',
  format: 'cjs',
  sourcemap: isDev,
  exports: 'named',
  globals,
  plugins: !isDev && [terser()],
}

const umd = {
  file: pkg.browser,
  format: 'umd',
  sourcemap: isDev,
  name: 'ReactImage',
  globals,
  plugins: !isDev && [terser()],
}

const esm = {
  file: pkg.module,
  format: 'esm',
  exports: 'named',
  globals,
}
const devPlugins = !isDev ? [] : [serve('.dev'), livereload()]
const normalPlugins = !isDist
  ? [
      url(),
      postcss({ extract: true, sourceMap: isDev, minimize: !isDev }),
      html({ template: isDemo ? templatePro : templateDev }),
      copy({
        targets: [
          {
            src: 'demo/assets',
            dest: '.dev',
            rename: 'assets',
          },
        ],
      }),
    ]
  : []
const distPlugins = isDist
  ? [
      copy({
        targets: [
          {
            src: 'src/react-cool-image.d.ts',
            dest: pkg.types.split('/')[0],
            rename: 'index.d.ts',
          },
        ],
      }),
      copy({
        targets: [
          {
            src: 'src/style.scss',
            dest: pkg.types.split('/')[0],
          },
        ],
      }),
    ]
  : []

const extensions = ['.js', '.ts', '.tsx', '.json']
const plugins = [
  resolve({ extensions }),
  commonjs(),
  babel({ exclude: 'node_modules/**', extensions, babelHelpers: 'bundled' }),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(
      isDev ? 'development' : 'production',
    ),
    VERSION: pkg.version,
    NAME: pkg.name,
  }),
  ...normalPlugins,
  ...devPlugins,
  !isDev &&
    visualizer({
      json: true,
      gzipSize: true,
      brotliSize: true,
      filename: '.stats.json',
    }),
  isDemo &&
    copy({
      targets: [{ src: '.dev', dest: '.', rename: 'build' }],
      hook: 'writeBundle',
    }),
  ...distPlugins,
]
export default {
  input: isDist ? 'src' : 'demo',
  output: isDist ? [cjs, esm, umd] : [cjs],
  plugins: plugins.filter(Boolean),
  external: isDist ? Object.keys(pkg.peerDependencies) : [],
}
