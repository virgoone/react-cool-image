import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import { visualizer } from 'rollup-plugin-visualizer'

import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import pkg from '../package.json'

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}
const cjs = {
  file: pkg.main,
  format: 'cjs',
  sourcemap: false,
  exports: 'named',
  globals,
  plugins: [terser()],
}

const umd = {
  file: pkg.browser,
  format: 'umd',
  sourcemap: false,
  name: 'ReactImage',
  globals,
  plugins: [terser()],
}

const esm = {
  file: pkg.module,
  format: 'esm',
  exports: 'named',
  globals,
}

const extensions = ['.js', '.ts', '.tsx', '.json']
const plugins = [
  resolve({ extensions }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    extensions,
    babelHelpers: 'bundled',
    configFile: false,
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
  }),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production'),
    VERSION: pkg.version,
    NAME: pkg.name,
  }),
  visualizer({
    json: true,
    gzipSize: true,
    brotliSize: true,
    filename: '.stats.json',
  }),
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
export default {
  input: 'src',
  output: [cjs, esm, umd],
  plugins: plugins.filter(Boolean),
  external: Object.keys(pkg.peerDependencies),
}
