var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
      filename: './build/bundle.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts', '.js']
    },
    resolveLoader: {
        alias: {
            'bundle-loader': require.resolve('./loaders/bundle.js'),
            'binding-loader': require.resolve('./loaders/binding.js')
        }
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: 'ts-loader' }
        ]
    }
  }