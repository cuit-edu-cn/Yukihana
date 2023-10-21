// file: rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'ntqq/resources/app/app_launcher/',
    format: 'cjs'
  },
  plugins: [typescript()]
};