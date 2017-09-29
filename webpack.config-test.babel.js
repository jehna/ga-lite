module.exports = {
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [],
          plugins: [require('babel-plugin-transform-object-rest-spread')]
        }
      }
    ]
  }
}
