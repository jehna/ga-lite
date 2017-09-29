const path = require('path')
const nodeExternals = require('webpack-node-externals')
const isCoverage = process.env.NODE_ENV === 'coverage'

module.exports = {
  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  target: 'node',
  module: {
    loaders: [].concat(
      isCoverage ? {
        test: /\.(js)/,
        include: path.resolve('src'), // instrument only testing sources with Istanbul, after ts-loader runs
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        }
      } : [],
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [],
          plugins: [require('babel-plugin-transform-object-rest-spread')]
        }
      }
    )
  },
  externals: [nodeExternals()],
  devtool: "inline-cheap-module-source-map"
}
