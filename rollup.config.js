// see https://github.com/rozek/build-configuration-study

import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser'

export default {
  input: './src/GlifRunner.ts',
  output: [
    {
      file:     './dist/GlifRunner.umd.js',
      format:   'umd', // builds for both Node.js and Browser
      name:     'dommali', // required for UMD modules
      sourcemap:true,
      plugins: [terser({ format:{ comments:false, safari10:true } })],
    },{
      file:     './dist/GlifRunner.esm.js',
      format:   'esm',
      sourcemap:true,
    }
  ],
  plugins: [
    typescript(),
  ],
};