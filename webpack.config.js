const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    'ga-lite': './src/ga-lite',
    'ga-lite.min': './src/ga-lite'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: ['galite']
  },
  target: 'web',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
