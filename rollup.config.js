import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';


export default {
  input: 'src/index.js',
  output: [ {
    file: 'dist/index.umd.js',
    format: 'umd',
    name: 'react-mini-router-hook',
    globals: {
      react: 'React',
    }
  },
  {
    file: 'dist/index.js',
    format: 'cjs',
  }
  ],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    buble({
      transforms: {
        spreadRest: true,
        letConst: true,
        arrow: true,
        modules: false,
      },
      objectAssign: 'Object.assign'
    }),
  ],
  external: [ 'react' ],
};
