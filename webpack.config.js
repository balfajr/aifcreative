import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const normalizePublicUrl = (value = '') => {
  if (!value) {
    return '';
  }
  return value.endsWith('/') ? value.slice(0, -1) : value;
};

const publicUrl = normalizePublicUrl(process.env.PUBLIC_URL);

export default {
  entry: path.resolve(__dirname, 'src/main.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'assets/js/[name].[contenthash].js' : 'assets/js/[name].js',
    assetModuleFilename: 'assets/media/[name][hash][ext][query]',
    publicPath: publicUrl ? `${publicUrl}/` : '/',
    clean: true,
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/i,
        oneOf: [
          {
            resourceQuery: /react/,
            use: ['@svgr/webpack'],
          },
          {
            type: 'asset/resource',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      templateParameters: {
        PUBLIC_URL: publicUrl ? `${publicUrl}/` : '/',
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: '404.html',
      templateParameters: {
        PUBLIC_URL: publicUrl ? `${publicUrl}/` : '/',
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'aificon.png'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'favicon-16.png'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'favicon-32.png'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'favicon-180.png'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? 'assets/css/[name].[contenthash].css' : 'assets/css/[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(publicUrl ? `${publicUrl}/` : '/'),
      'process.env.BASENAME': JSON.stringify(process.env.BASENAME || ''),
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/',
        watch: true,
      },
      {
        directory: path.resolve(__dirname),
        publicPath: '/',
        watch: false,
      },
    ],
    historyApiFallback: true,
    compress: true,
    port: 5173,
    open: true,
    hot: true,
  },
};
