const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = '/dist/'
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin').default;
const AutoDllPlugin = require('autodll-webpack-plugin');
module.exports = (options = {}) => ({
  entry: {
    // vendor: ['react','react-dom'],
    app: './src/app.js'
 
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: options.dev ? '[id].js' : '[id].[chunkhash].js' ,
    publicPath: options.dev ? '/' : publicPath
  },
  module: {
    rules: [
       {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
      },  
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use:[
            "style-loader",
            "css-loader",
            "less-loader",
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: __dirname, // 与DllPlugin中的那个context保持一致
    //   /** 
    //       下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
    //       这样webpack打包时，会检测此文件中的映射，不会把存在映射的包打包进bundle.js
    //   **/
    //   manifest: require('./dll/vendor-manifest.json')
    // }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name:'common',
    //   minChunks: 3,
    //   chunks: ['common','app']
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name:'vendor',
    //   minChunks: Infinity,
    //   chunks: ['vendor']
    // }),
    new AutoDllPlugin({
      filename: '[name].[hash].js', 
      path: '/',
      inject:true,
      entry: {
        vendor: ['react','react-dom']
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告  
            warnings: true,
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          }
        })
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl',
      filename: 'index.html',
      chunks:['vendor','app']
    }),
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告  
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }),
  
    new CopyWebpackPlugin([{
      from: '*/image/'
    }]),
    new ImageminPlugin({
      disable:options.dev ? true : false, 
      pngquant: {
        quality: '80'
      },
      jpegtran:{
        progressive: true
      },
      test: /\.(jpe?g|png|gif|svg)$/i
    }),
    new webpack.DefinePlugin({
      ISDEV:options.dev ? true : false
    })
 
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.json', '.css']
  },
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
  devtool: options.dev ? '#eval-source-map' : 'false'
})
