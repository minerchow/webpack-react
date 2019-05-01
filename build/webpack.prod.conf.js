const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.conf.js');
const publicPath = '/dist/'
const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: publicPath
    },
    devtool: false,
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'commons',
                    test: /\/(.*)\.js/,
                    minChunks: 2,
                    minSize: 0, // This is example is too small to create commons chunks
                },
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10,
                    test: /node_modules\/(.*)\.js/,
                },
            },
        },
        runtimeChunk: {
            name: 'manifest'
        }

    },
}

module.exports = merge(commonConfig, prodConfig)