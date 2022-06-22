const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();
const { SERVER_PORT, CLIENT_PORT } = process.env;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: { src: './client/index.js' },
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    // enable HMR on the devServer
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/',
    },
    proxy: {
      '/': `http://localhost:${3000}/`,
    },
    // historyApiFallback: true,
    // compress: true,
    // proxy: {
    //   //changes domain request comes from
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     // pathReWrite: { '^/api': '' },
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      title: 'development',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/transform-async-to-generator',
          ],
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
      // {
      //   test: /\.less$/,
      //   use: ["style-loader", {loader: 'css-loader', options: {sourceMap: 1}}, "postcss-loader", "less-loader"]
      // },
    ],
  },
};
