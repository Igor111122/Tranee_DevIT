const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: { myAppName: path.resolve(__dirname, "./src/index.js")}, // Точка входа для фронтенда
  output: {
    path: path.resolve(__dirname, '../app/public/static'), // Директория, куда будут сохранены файлы
    filename: production? '[name].js' : '[name].js', // Имя выходного файла с хэшем
    //filename: production? '[name].[contenthash].js' : '[name].js', // Имя выходного файла с хэшем
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"], // Подключите Babel, если вам нужна поддержка современного JavaScript
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'  
      ] 
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      },
    ],
  },
  resolve:{
    extensions: ["*",".js",".jsx",".scss"]
  },
  plugins: [
    new CleanWebpackPlugin(), // Очищает старые файлы в папке статик
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        title: "BlackJack",
        template: './src/index.html', // Использует ваш HTML как шаблон
    }),
    new MiniCssExtractPlugin({
        filename: production ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
  devServer: {
    port: 3000, // Порт для сервера разработки
    hot: true,
  },
  mode: production ? 'production' : 'development',
};
