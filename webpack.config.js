const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // webpack 入口文件
  entry: "./src/index.ts",

  // 打包输出的文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    // webpack 打包不使用箭头函数，兼容 ie
    environment: {
      arrowFunction: false
    }
  },

  // 指定 webpack 打包时所需要用到的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test 指定的是规则生效的文件
        test: /\.ts$/,
        // 需要使用的 loader, 可以用字符串也可以用数组，按照数组的书写顺序执行 loader
        use: [
          // 配置 babel
          {
            // 指定加载器
            loader: 'babel-loader',
            // 设置 babel
            options: {
              // 设置预定的 babel 环境
              presets: [
                [
                  // 指定的环境插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: '80',
                      ie: '11'
                    },
                    // 指定 corejs 的版本
                    'corejs': '3',
                    // 使用 corejs 的方式 "usage" 表示按需加载
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 需要排除的文件
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "自定义html title"
      template: "./public/index.html"
    }),
  ],
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js']
  }
}