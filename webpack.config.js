const path = require("path");

const output = {
  path: path.resolve(__dirname, "dist"),
  filename: "[name].js"
};

const umd = {
  mode: "production",
  output: {
    ...output,
    library: {
      type: "umd",
      export: "default",
      name: "galite"
    },
    globalObject: 'this'
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

module.exports = [{
  entry: {
    "ga-lite": "./src/ga-lite"
  },
  optimization: {
    minimize: false
  },
  ...umd
}, {
  entry: {
    "ga-lite.min": "./src/ga-lite"
  },
  ...umd
}, {
  entry: {
    "ga-lite.esm": "./src/ga-lite"
  },
  mode: "production",
  output: {
    ...output,
    library: {
      type: "module"
    }
  },
  optimization: {
    minimize: false
  },
  experiments: {
    outputModule: true
  }
}];
