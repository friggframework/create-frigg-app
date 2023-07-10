import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/components/test/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: "amd",
      name: '@friggframework/ui-library',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      name: '@friggframework/ui-library',
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    babel({
      babelHelpers: 'runtime',
      skipPreflightCheck: false
    }),
    external(),
    resolve({
      preferBuiltins: true,
    }),
    json(),
    commonjs({
      defaultIsModuleExports: true
      // include: "node_modules/**"
    }),
    postcss(),
    terser(),
  ],
};
