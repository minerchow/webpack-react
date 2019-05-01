const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.conf.js')

const devConfig = {
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath:'/'
    },
    devtool: 'cheap-module-eval-soure-map',
    devServer: {
        host: '127.0.0.1',
        port: 1010,
        publicPath:"/",
        proxy: {
          '/api/': {
            target: 'http://127.0.0.1:8080',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        },
        hot: true,
        watchOptions: {
          aggregateTimeout: 30,
          poll: 300
        }
    },
    plugins: [
        
    ]
}
module.exports = merge(commonConfig, devConfig)
