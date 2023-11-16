const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '..', 'public');
const SRC_DIR = path.resolve(__dirname, '..', 'src');

module.exports = {
  entry: [`@babel/polyfill`,`${SRC_DIR}/index.js`],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      minify: false,
      template: path.resolve(SRC_DIR,'index.html')
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname,'..','images'), to: path.resolve(BUILD_DIR,'images') },
      ]
    }),
  ]
}
