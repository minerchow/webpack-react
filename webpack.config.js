const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = '/dist/'
//const ImageminPlugin = require('imagemin-webpack-plugin').default;
//const CopyWebpackPlugin = require('copy-webpack-plugin').default;
const AutoDllPlugin = require('autodll-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = (options = {}) => ({
  entry: {
    vendor: ['react','react-dom','mobx','mobx-react','react-router-dom'],
    app: './src/app.js',
    commons:['./src/common/util.js']
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].[hash].js' : '[name].[chunkhash].js',
    chunkFilename: options.dev ? '[id].[hash].js' : '[id].[chunkhash].js' ,
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
    //new BundleAnalyzerPlugin(),
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
  
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.tpl',
      filename: options.dev ? 'index.html' : '../index.html',
      chunks:['vendor','commons','manifest','app']  
    }),
    // new AutoDllPlugin({
    //     inject: true,
    //     filename: '[name]_[hash].js',
    //     entry: {
    //       vendor: [
    //         'react','react-dom','mobx','mobx-react','react-router-dom'
    //       ]
    //     }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   // 最紧凑的输出
    //   beautify: false,
    //   // 删除所有的注释
    //   comments: false,
    //   compress: {
    //     // 在UglifyJs删除没有用到的代码时不输出警告  
    //     warnings: false,
    //     // 删除所有的 `console` 语句
    //     // 还可以兼容ie浏览器
    //     drop_console: true,
    //     // 内嵌定义了但是只用到一次的变量
    //     collapse_vars: true,
    //     // 提取出出现多次但是没有定义成变量去引用的静态值
    //     reduce_vars: true
    //   }
    // }),
    
    
    new webpack.DefinePlugin({
      ISDEV:options.dev ? true : false
    })
 
  ],
  optimization: {
	splitChunks: {
      chunks: 'all',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      minSize: 30000,//合并前模块文件的体积
      minChunks: 1,//最少被引用次数
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',//自动命名连接符
      name:true,
      cacheGroups: {
        // commons: {
        //   chunks: 'initial',
        //   name: 'common',
        //   test:/[\\/]src[\\/]common[\\/]/,
        //   minChunks: 2,
        //   priority:1,
        //   minSize: 0, // This is example is too small to create commons chunks
        // },
        vendor: {
          name: 'vendor',
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          minChunks:1,
          priority: -10,
          test: /react|react-dom|mobx|mobx-react|react-router-dom/
        },
        default: {
          chunks: 'all',
          test: /[\\/]src[\\/]/,
          minChunks: 2,//一般为非第三方公共模块
          priority: -20,
          reuseExistingChunk: true,
          name:"common"
        }
    },
  },
    runtimeChunk: {
			name: 'manifest'
		}
  
}, 
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
