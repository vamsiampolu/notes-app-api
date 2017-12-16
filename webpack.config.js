const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const NODE_MODULES = path.resolve('./node_modules/')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: NODE_MODULES
      }
    ]
  }
}
