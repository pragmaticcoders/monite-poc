const { resolve } = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const aliases = {
  components: resolve(__dirname, './src/components/'),
  utils: resolve(__dirname, './src/utils/'),
  store: resolve(__dirname, './src/store/'),
  views: resolve(__dirname, './src/views/'),
  assets: resolve(__dirname, './src/assets/'),
  service: resolve(__dirname, './src/service/'),
  hooks: resolve(__dirname, './src/hooks/'),
  controller: resolve(__dirname, './src/controller/'),
};

module.exports = function(environmentType) {
  return {
    entry: {
      app: ['@babel/polyfill', resolve(__dirname, './src/index.tsx')],
    },
    target: 'web',
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: resolve(__dirname, 'dist/' + environmentType),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.mjs'],
      alias: { ...aliases },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: false,
        http: false,
        https: false,
        os: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.svg$/,
          exclude: [/node_modules/],
          loader: 'svg-url-loader',
        },
        {
          test: /\.(woff2?|jpe?g|png|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/images/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new NodePolyfillPlugin(),
      new ReactRefreshWebpackPlugin(),
    ],
  };
};
