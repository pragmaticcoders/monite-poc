const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function() {
  return merge(common(), {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devServer: {
      static: true,
      compress: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      historyApiFallback: true,
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      new ReactRefreshWebpackPlugin()
    ],
  });
};