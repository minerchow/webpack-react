const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const publicPath = '/dist/'
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin').default;
module.exports = {
    entry: {
        vendor: ['react','react-dom'],
        app: './src/app.js',
        commons:['./src/common/util.js']
    },
    output: {
        path: resolve(__dirname, 'dist')
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
        
        new HtmlWebpackPlugin({
          inject: true,
          template: 'src/index.tpl',
          filename: 'index.html',
       
        }),
       
        
     
      ],
      performance: false,
      resolve: {
        alias: {
          '~': resolve(__dirname, 'src')
        },
        extensions: ['.js', '.jsx', '.json', '.css']
      },
}