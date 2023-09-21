const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate an HTML file and inject bundles
      new HtmlWebpackPlugin({
        template: './src/index.html',
        //filename: 'index.html',
        title: 'J.A.T.E'
      }),

      // Inject service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Path to service worker file
        swDest: 'src-sw.js', // Output file for service worker
      }),

      // Generate Manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'TE',
        description: 'Create and edit text content',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      })
    ],

    module: {
      rules: [
        // CSS loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // JavaScript loaders
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Babel-loader for ES6
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        // Asset loaders
        // {
        //   test: /\.(png|jpg|jpeg|gif|svg)$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         name: 'assets/[name].[ext]', // Output path and filename
        //       },
        //     },
        //   ],
        // },
      ],
    },
  };
};
