const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const distPath = path.resolve(__dirname, './dist');

const env = process.env.NODE_ENV !== 'production' ? 'development' : 'production';

const nodeExternals = require('webpack-node-externals');

// https://github.com/TooTallNate/node-bindings/issues/42
// externals - bindings...
// node_modules/speaker/build/Release/binding.node를 server/build/ 로 복사해두면 빌드 실행시 잘 찾는다
// 'externals': {
//   bindings: 'require("bindings")',
// }

module.exports = {
  'entry': path.resolve(__dirname, 'src', 'index.ts'),
  'output': {
    'path': distPath,
    'filename': 'main.js',
  },
  'module': {
    'rules': [
      {
        'test': /\.tsx?$/,
        'use': [
          'ts-loader',
        ],
      },
    ],
  },
  'plugins': [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env.FLUENTFFMPEG_COV': false
    }),
  ],
  'target': 'node',
  'node': {
    '__dirname': true,
  },
  'externals': [
    nodeExternals(),
  ],
  'devtool': 'source-map',
  'resolve': {
    'extensions': [
      '.ts',
      '.tsx',
      '.js',
      '.json',
    ],
    'alias': {
      '@src': path.resolve('./src/'),
    },
  },
  'mode': env,
};
