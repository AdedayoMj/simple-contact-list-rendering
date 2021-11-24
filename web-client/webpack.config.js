const path = require('path');
const webpack = require('webpack');
const app = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrintTimeWebpackPlugin = require('print-time-webpack');
const HeaderInjectionWebpackPlugin = require('@bndynet/header-injection-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

function resolveTsconfigPathsToAlias({
  tsconfigPath = './tsconfig.json',
  webpackConfigBasePath = './',
} = {}) {
  const { paths } = require(tsconfigPath).compilerOptions;

  const aliases = {};

  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '');
    const value = path.resolve(
      webpackConfigBasePath,
      paths[item][0].replace('/*', '')
    );

    aliases[key] = value;
  });

  return aliases;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = (env) => ({
  entry: ['./src/index.tsx'],
  performance: {
    hints: false,
  }, // disable to show warnings about performance
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'css', 'json'],
    alias: {
      ...resolveTsconfigPathsToAlias(),
      react: path.join(__dirname, 'node_modules/react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            // options: {
            //     plugins: [
            //         isDevelopment && 'react-refresh/babel',
            //     ].filter(Boolean),
            // },
          },
        ],
      },
    ],
  },
  plugins: [
    new PrintTimeWebpackPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: 'public',
    }),
    new HtmlWebpackPlugin({
      title: app.title,
      meta: {
        author: app.author,
        description: app.description,
      },
      inject: true,
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
      manifest: './public/manifest.json',
    }),
    // new WebpackPwaManifest({
    //   name: 'Pixi Slot Machine',
    //   short_name: 'PixiSlot',
    //   description: 'Simple Slot machine',
    //   background_color: '#ffffff',
    //   crossorigin: 'anonymous', //can be null, use-credentials or anonymous
    //   icons: [
    //     {
    //       src: path.resolve('public/imak192.png'),
    //       sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
    //     },
    //     {
    //       src: path.resolve('public/maskable.png'),
    //       size: '1024x1024',
    //       purpose: 'maskable',
    //     },
    //   ],
    // }),
    // new HtmlWebpackPlugin({
    //     template: './public/index.html',
    //     minify: {
    //         minifyJS: true,
    //         minifyCSS: true,
    //         removeComments: true,
    //         useShortDoctype: true,
    //         collapseWhitespace: true,
    //         collapseInlineTagWhitespace: true,
    //     },
    //     append: {
    //         head: `<script src="https://cdn.polyfill.io/v3/polyfill.min.js"></script>`,
    //     },
    //     meta: {
    //         title: pkg.name,
    //         description: pkg.description,
    //         keywords: Array.isArray(pkg.keywords)
    //             ? pkg.keywords.join(',')
    //             : undefined,
    //     },
    // }),
    new BaseHrefWebpackPlugin({
      baseHref: env && env.baseHref,
    }),
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(app.name),
      APP_VERSION: JSON.stringify(app.version),
      APP_BUILD: JSON.stringify(Date.now()),
      APP_BASEHREF: JSON.stringify(env && env.baseHref ? env.baseHref : '/'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: path.resolve(__dirname, './assets') }],
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HeaderInjectionWebpackPlugin(),

    // react refresh
    // isDevelopment && new webpack.HotModuleReplacementPlugin(),
    // isDevelopment && new ReactRefreshWebpackPlugin(),
  ],
  // .filter(Boolean)
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
