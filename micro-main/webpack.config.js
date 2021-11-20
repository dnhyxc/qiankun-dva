const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'
const matchSVGSprite = /assets\/icons\/|components\/Base\/Icon\/icons\//;
const { ESLINT_LOADER_DISABLED, IS_REAL_PROD } = process.env; // 通过环境变量禁用 eslint-loader
const apiMocker = require('mocker-api');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },

  // 生产模式下关闭map文件
  devtool: devMode ? "source-map" : "none",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '$': path.resolve(__dirname, './typings'),
    },
  },

  module: {
    rules: [
      !devMode && !ESLINT_LOADER_DISABLED ? {
        enforce: 'pre',
        test: /\.jsx?|\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'eslint-loader',
        options: {
          cache: true,
        },
      } : {},
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env", {
                  modules: false,
                }],
                "@babel/preset-react",
              ],
              plugins: [
                ['@babel/plugin-transform-runtime', {
                  useESModules: true,
                }],
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              transpileOnly: true,
              compilerOptions: {
                noEmit: false,
                module: 'esnext',
                target: devMode ? 'es2017' : 'es5',
              },
            },
          },
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.(css|less)$/,
        use: [
          devMode ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // modifyVars: {
                //   'primary-color': 'green',
                //   'menu-item-active-bg': 'green',
                // },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader', 'raw-loader', 'file-loader']
      },
      {
        test: /\.(mp4|png|jpg|jpeg|png|svg|cur|gif|webp|webm|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/[name].[hash:11].[ext]',
            },
          },
        ],
        exclude: matchSVGSprite,
      },
      {
        test: /\.svg$/,
        include: matchSVGSprite,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.ejs'),
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 移除空格
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new OptimizeCSSAssetsPlugin(),
  ],
  externals: {
    // "react": "React",
    // "react-dom": "ReactDOM"
  },
  devServer: {
    port: 9002,
    host: 'localhost',
    // open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
      },
    },
    before(app) {
      apiMocker(app, path.resolve(__dirname, './mock/mock.js'));
    },

    // 配置启动时终端提示信息
    stats: {
      colors: true,
      hash: false, // 编译使用的 hash
      version: false, // 用来编译的 webpack 的版本
      timings: true, // 编译耗时 (ms)
      assets: false, // 是否开启assets提示
      chunks: false,
      modules: false, // 是否开启modules提示
      reasons: false,
      children: false,
      source: false,
      errors: true, // 处理这个模块发现的错误的数量
      errorDetails: false,
      warnings: true,
      publicPath: false,
      warningsFilter: /export .* was not found in/,
    },
  },

  // 设置打包构建时终端中的提示信息
  stats: {
    hash: false, // 编译使用的 hash
    timings: true, // 告知 stats 添加时间信息
    modules: false, // 告知 stats 是否添加关于构建模块的信息
    chunks: false, // 告知 stats 是否添加关于 chunk 的信息。
    version: false, // 是否用来编译的 webpack 的版本
    assets: true, // 是否关闭展示资源信息
    children: false, // 不添加关于子模块的信息。
    warningsFilter: warning => /Conflicting order between/gm.test(warning), // 排除掉匹配的告警信息
  },

  performance: {
    hints: 'warning', // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: (assetFilename) => {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },
};