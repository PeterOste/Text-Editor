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
        filename: 'index.html',
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
        start_url: './',
        publicPath: './',
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
      ],
    },
  };
};
