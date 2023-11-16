const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

console.log(commonConfig.output.path)

const devConfig = {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    static: commonConfig.output.path,
    port: 3030,
    historyApiFallback: true
  },
  resolve: {
    fallback: {
      querystring: require.resolve("querystring-es3")
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
    ],
  },
  plugins: [
    new ErrorOverlayPlugin()
  ],
  devtool: 'cheap-module-source-map'
}

module.exports = merge(commonConfig, devConfig)
