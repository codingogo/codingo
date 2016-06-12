module.exports = {
  context: __dirname + '/ng-app',
  entry: './index.js',
  output: {
    path: __dirname + '/ng-app',
    filename: 'bundle.js'
  }, 
  // devServer: {
  //   contentBase: 'public'
  // },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']
  }
};