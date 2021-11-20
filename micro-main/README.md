### dva 配置

#### 安装 dva

1，全局安装 dva-cli：

```js
npm install dva-cli -g
```

2，初始化 dva 项目：

- 安装方式一：dva new myapp。

- 安装方式二：在创建好的项目文件夹中运行 dva init。

### 安装 webpack

#### 安装 webpack webpack-cli webpack-dev-server

> 注意：webpack webpack-cli 下载的版本需要与全局的版本保持一致，防止出现不必要的错误，webpack-dev-server 版本不能下太高，否则可能出现兼容性错误。

1，我本地 webpack webpack-cli 分别为：webpack@4.44.2，webpack-cli@4.4.0。webpack-dev-server 为：webpack-dev-server@3.11.2

```js
npm i webpack@4.44.2 webpack-cli@4.4.0 webpack-dev-server@3.11.2 -D
```

### 配置 webpack.config.js 文件

> 在项目根目录中创建 webpack.config.js 文件。

#### 配置 入口及输出路径

1，相关配置如下：

```js
entry: "./src/index.ts",
output: {
  filename: "bundle.js",
  path: path.resolve(__dirname, "build"),
},
```

#### 打包样式资源

1，打包样式资源需要使用的 loader（以下 loader 具体的用处可自行百度）：

- style-loader、css-loader、less、less-loader、postcss-normalize。

```js
npm i style-loader css-loader less less-loader postcss-normalize -D
```

2，如果是移动端，可以配置 px2rem-loader 将 px 自动转为 rem。

- 安装 px2rem-loader 的同时还需安装 lib-flexible。

```js
npm i px2rem-loader lib-flexible -D
```

- 安装完毕以后需要在项目入口 js/ts 文件中引入 lib-flexible。

```js
import "lib-flexible";
```

3，具体配置如下：

```js
module: {
  rules: [
    {
      test: /\.(css|less)$/,
      use: [
        devMode ? MiniCssExtractPlugin.loader : "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              mode: "local",
              localIdentName: "[name]__[local]",
            },
            importLoaders: 1,
          },
        },
        {
          loader: "less-loader",
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
        {
          loader: "px2rem-loader",
          options: {
            importLoaders: 1,
            remUnit: 37.5,
            min: 2,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              ident: "postcss",
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    autoprefixer: {
                      // browsers: [
                      //   '>1%',
                      //   'last 4 versions',
                      //   'Firefox ESR',
                      //   'not ie < 9',
                      // ],
                      flexbox: "no-2009",
                    },
                    stage: 3,
                  },
                ],
                postcssNormalize(),
              ],
            },
            sourceMap: false,
          },
        },
      ],
    },
  ];
}
```

#### 打包 js/jsx/ts/tsx 等资源

1，打包 js/jsx/ts/tsx 等资源需要使用的 loader（以下 loader 具体的用处可自行百度）：

- @babel/core、@babel/preset-env、babel-loader、@babel/preset-react、@babel/plugin-transform-runtime、ts-loader、typescript

```js
npm i @babel/core @babel/preset-env babel-loader @babel/preset-react @babel/plugin-transform-runtime ts-loader typescript -D
```

2，具体配置如下：

```js
module: {
  rules: [
    {
      test: /\.(js|jsx|ts|tsx)$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  useESModules: true,
                  corejs: 3,
                },
              ],
            ],
          },
        },
        {
          loader: "ts-loader",
          options: {
            happyPackMode: true,
            transpileOnly: true,
            compilerOptions: {
              noEmit: false,
              module: "esnext",
              target: devMode ? "es2017" : "es5",
            },
          },
        },
      ],
      exclude: [/node_modules/],
    },
  ];
}
```

#### 打包图片资源

1，打包图片资源需要使用的 loader（以下 loader 具体的用处可自行百度）：

- url-loader、html-loader、file-loader

```js
npm i url-loader html-loader file-loader -D
```

2，具体配置如下：

```js
module: {
  rules: [
    {
      test: /\.(mp4|png|jpg|jpeg|png|svg|cur|gif|webp|webm|otf)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/[name].[hash:11].[ext]",
          },
        },
      ],
      exclude: /assets\/icons\/|components\/Base\/Icon\/icons\//,
    },
    {
      test: /\.html$/,
      loader: "html-loader",
    },
  ];
}
```

#### 打包 svg 资源

1，打包 svg 资源需要使用的 loader（以下 loader 具体的用处可自行百度）：

- svg-sprite-loader

```js
npm i svg-sprite-loader -D
```

2，具体配置如下：

```js
module: {
  rules: [
    {
      test: /\.svg$/,
      include: /assets\/icons\/|components\/Base\/Icon\/icons\//,
      use: [
        {
          loader: "svg-sprite-loader",
          options: {
            symbolId: "icon-[name]",
          },
        },
      ],
    },
  ];
}
```

#### plugins 配置

1，所需插件：html-webpack-plugin、mini-css-extract-plugin、optimize-css-assets-webpack-plugin

```js
npm i html-webpack-plugin mini-css-extract-plugin optimize-css-assets-webpack-plugin -D
```

2，具体配置如下：

```js
plugins: [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.resolve(__dirname, "./src/index.ejs"),
    minify: {
      removeComments: true, // 移除注释
      collapseWhitespace: true, // 移除空格
    },
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[name].css",
  }),
  new OptimizeCSSAssetsPlugin(),
];
```

#### 配置 dll

1，在根目录下创建 webpack.config.dll.js 文件。

2，dll 可以将不常更新的公共包（antd，react...）打包到一起，避免每次 run dev / run build 的时候重复编译。

3，当公共包需要更新时，比如升级版本/添加新的公共包：

- 使用 npm run dll 编译公共包。

- 更新 index.ejs 的 vendor 版本号，和项目一起发布。

4，具体 dll 配置如下：

```js
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * 将不常更新的公共包打包到一起，避免每次 run dev / run build 的时候重复编译。
 *
 * 当公共包需要更新时，比如升级版本/添加新的公共包：
 * 1. npm run dll # 编译公共包
 * 2. npm run dll-ship # 发布公共包（cship 在 npm run 下运行有问题，请复制 dll-ship 内容手动运行）
 * 3. 更新 index.ejs 的 vendor 版本号，和项目一起发布。
 *
 * 注意：
 * 1. 如果需要更新公共包，切记公共包和项目包需要一起发布，不可二缺一！
 * 2. 开发和线上分别使用一份 vendor，每个 vendor 和 manifest 是对应的
 */

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  const name = isDev ? "vendor-[hash].dev" : "vendor-[hash]";

  return {
    context: __dirname,
    entry: [
      "react",
      "react-dom",
      "antd",
      "antd/dist/antd.min.css",
      "@babel/polyfill",
      "react-router-dom",
    ],
    output: {
      filename: `${name}.js`,
      path: path.resolve(__dirname, "./vendor/dist/"),
      library: "vendor",
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "./src/index.ejs"),
        chunksSortMode: "none",
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DllPlugin({
        name: "vendor",
        path: path.resolve(
          __dirname,
          isDev
            ? "./vendor/vendor-manifest-dev.json"
            : "./vendor/vendor-manifest.json"
        ),
      }),
      new MiniCssExtractPlugin({
        filename: `${name}.css`,
        chunkFilename: "[id].css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    devtool: "source-map",
  };
};
```

> **说明**：由于 antd 样式资源使用 dll 进行了打包，因此在项目中即可使用按需加载 antd 的样式了，无需在其他地方在进行配置。

#### 配置 devServer

1，在 devServer 具体配置如下：

```js
devServer: {
  port: 8000,
  host: 'localhost',
  // open: true,
  disableHostCheck: true,
  historyApiFallback: true,
  proxy: {
    '/api': {
      target: 'http://test.xxx.xxx.com',
      changeOrigin: true,
    },
  },
  before(app) {
    apiMocker(app, path.resolve(__dirname, './mock/mock.js'));
  },

  // 配置启动时在终端需要显示及隐藏的提示信息
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
}
```

#### 配置 stats

> 在与 plugins 或 devServer 同层次下添加 stats 配置。

1，该配置主要用于设置在项目 build 打包时在终端的提示信息。

2，具体配置如下：

```js
devServer:[
  // ...
],
// 设置打包构建时终端中的提示信息
stats: {
  hash: false, // 编译使用的 hash
  timings: true,  // 告知 stats 添加时间信息
  modules: false, // 告知 stats 是否添加关于构建模块的信息
  chunks: false,  // 告知 stats 是否添加关于 chunk 的信息
  version: false, // 是否展示用来编译的 webpack 的版本
  assets: false,  // 是否关闭展示资源信息
  children: false,  // 是否不添加关于子模块的信息
  warningsFilter: warning => /Conflicting order between/gm.test(warning), // 排除掉匹配的告警信息
}
```

#### 配置 performance

> 在与 plugins 或 devServer 同层次下添加 performance 配置。

1，该配置主要用来控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」，如果不配置该属性，如果一个资源超过 250kb，webpack 会对此输出一个警告（报黄）来通知你。

```js
devServer:[
  // ...
],
// 配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
performance: {
  hints: "warning", // 不展示警告或错误提示。
  maxAssetSize: 30000000, // 整数类型（以字节为单位）
  maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
  assetFilter: function (assetFilename) { // 此属性允许 webpack 控制用于计算性能提示的文件
    // 提供资源文件名的断言函数
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
  }
}
```

#### 更改 package.json

1，具体更改如下：

```json
"start": "webpack serve --mode=development --config=webpack.config.js --hot --inline",
"build": "npm i && webpack --mode=production --progress",
```

### 配置 typescript

#### 配置 tsconfig.json

1，文件具体配置如下：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["es6", "es2016", "es2017", "es2018", "esnext", "dom"],
    "allowJs": true,
    "skipLibCheck": true,
    "jsx": "react",
    "sourceMap": true,
    "noEmit": true,
    "importHelpers": true,
    "strict": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "$/*": ["typings/*"]
    },
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "experimentalDecorators": true
  },
  "include": ["src", "typings"],
  "exclude": ["build", "vendor", "**/*/_*", "src/components/VideoClipper"]
}
```

#### 增加 typings 文件配置

> 说明：由于当使用模块化引入 less 样式资源文件时，防止报找不到模块的错误，因此需要全局导出相应的资源文件。

1，在 typings 文件夹中增加 index.d.ts 文件，相关配置如下：

```js
declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.webp' {
  const url: string;
  export default url;
}

declare module '*.webm' {
  const url: string;
  export default url;
}

declare module '*.mp4' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}

/**
 * 考虑使用 typed-css-modules 对 less 自动生成 d.ts （主要是需要开进程 watch 编译，比较麻烦）
 * 或者调研 TypeScript 扩展
 */
declare module '*.less' {
  const styles: Record<string, string>;
  export default styles;
}

declare module 'dva-loading' {
  export default function createLoading(options: any): any;
}

declare module '*.woff';
declare module '*.woff2';
declare module '*.otf';

declare module '*.json' {
  const value: any;
  export default value;
}

declare interface Window {
  liangzhu_data_info: any;
}

declare module 'echarts/map/json/*.json' {
  const json: any;
  export default json;
}
declare module 'react-lines-ellipsis' {
  // type definitions goes here
  const LinesEllipsis: any;
  export default LinesEllipsis;
}

declare module 'react-lines-ellipsis/lib/responsiveHOC' {
  const responsiveHOC: any;
  export default responsiveHOC;
}

declare module 'react-useanimations' {
  const UseAnimations: any;
  export default UseAnimations;
}

interface HTMLVideoElement {
  __hls__?: Hls;
}

interface Window {
  HLS_JS_DEBUG?: boolean;
}

declare module 'china-division/dist/*.json' {
  const json: any;
  export default json;
}

declare module 'braft-utils' {
  const ContentUtils: any;
  export { ContentUtils };
}

declare module 'rc-form' {
  const createForm: any;
  export { createForm };
}
```

### 配置 eslint

#### eslint 所需插件

1，插件需要注意版本问题，否则会出现莫名错误，所需插件及版本如下：

```json
"@typescript-eslint/eslint-plugin": "~2.6.1",
"@typescript-eslint/parser": "~2.6.1",
"babel-eslint": "^8.2.3",
"eslint": "^5.3.0",
"eslint-config-airbnb": "^17.1.0",
"eslint-loader": "~3.0.2",
"eslint-plugin-import": "^2.17.3",
"eslint-plugin-jsx-a11y": "^6.1.2",
"eslint-plugin-react": "^7.16.0",
"eslint-plugin-react-ext": "^0.1.0",
"eslint-plugin-react-hooks": "^1.7.0",
```

#### 创建 .eslintrc 文件

1，该配置文件主要用于定义 eslint 的规则，具体配置如下：

```json
/**
 * Eslint (JavaScript 和 TypeScript)
 *
 * 如果希望在编辑时能实时看到 eslint 效果，需要按照 vscode eslint 插件
 * 注：eslint 插件默认不会校验 TypeScript 文件，需要在设置中修改：
 * 将设置（JSON）的 "eslint.validate": [ "javascript", "javascriptreact"]
 * 后面加上 , "typescript", "typescriptreact"
 */
{
  // TODO 目前 @typescript-eslint/parser 和 babel-eslint 对 jsx 的处理有一些差异，所以 js 还是维持原 parser
  "parser": "babel-eslint",
  "plugins": ["@typescript-eslint", "react-ext", "react-hooks"],
  "extends": "airbnb",
  "env": {
    "browser": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "settings": {
    "react": {
      "pragma": "React", // Pragma to use, default to "React"
      "version": "detect"
    }
  },
  "rules": {
    "linebreak-style": [0, "erron", "windows"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "arrow-body-style": ["off"],
    "camelcase": [
      "error",
      {
        "properties": "never",
        "allow": ["^UNSAFE_"]
      }
    ],
    "consistent-return": ["off"],
    "generator-star-spacing": ["off"],
    "global-require": ["error"],
    "import/extensions": ["off"],
    "import/no-extraneous-dependencies": ["off"],
    "import/no-unresolved": ["off"],
    "import/prefer-default-export": ["off"],
    "import/no-cycle": ["off"],
    "jsx-a11y/no-static-element-interactions": ["off"],
    "no-bitwise": ["off"],
    "no-console": ["off"],
    "no-else-return": ["off"],
    "no-loop-func": ["off"],
    "no-nested-ternary": ["off"],
    "no-restricted-syntax": ["off"],
    "react/forbid-prop-types": ["off"],
    "react/jsx-filename-extension": ["off"],
    "react/jsx-no-bind": ["error"],
    "react/prefer-stateless-function": ["off"],
    "react/prop-types": ["off"],
    "react/no-unsafe": [
      "error",
      {
        "checkAliases": true
      }
    ],
    "react/no-unused-state": ["warn"],
    "react-ext/no-unused-class-property": "warn",
    "require-yield": [1],
    "no-continue": ["off"],
    "no-mixed-operators": ["off"],
    "no-underscore-dangle": ["off"],
    "no-plusplus": ["off"],
    "no-unused-expressions": ["off"],
    "no-param-reassign": ["off"],
    "no-await-in-loop": ["off"],
    "no-alert": ["error"],
    "no-restricted-globals": ["error", "event"],
    "jsx-a11y/click-events-have-key-events": ["off"],
    "import/first": ["off"],
    "jsx-a11y/anchor-is-valid": ["off"],
    "react/require-default-props": ["off"],
    "arrow-parens": ["off"],
    "react/sort-comp": ["off"],
    "function-paren-newline": ["off"],
    "prefer-template": ["off"],
    "prefer-arrow-callback": [
      "error",
      {
        "allowNamedFunctions": true
      }
    ],
    "jsx-a11y/media-has-caption": ["off"],
    "jsx-a11y/alt-text": ["off"],
    "jsx-a11y/anchor-has-content": ["off"],
    "jsx-a11y/no-noninteractive-element-interactions": ["off"],
    "jsx-a11y/label-has-for": ["off"],
    "jsx-a11y/label-has-associated-control": ["off"],
    "jsx-a11y/mouse-events-have-key-events": ["off"],
    "class-methods-use-this": ["off"],
    "react/destructuring-assignment": ["off"],
    "operator-linebreak": ["off"],
    "max-len": [
      "error",
      {
        "code": 160,
        "ignoreComments": true
      }
    ],
    "react/button-has-type": ["off"],
    "react/no-access-state-in-setstate": ["off"],
    "react/jsx-no-target-blank": ["off"],
    "react/jsx-one-expression-per-line": ["off"],
    "react/no-danger": "off"
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      },
      "rules": {
        "import/export": ["off"], // 这一条不需要
        // 下面的这些需要禁用，然后启用 @typescript-eslint 下同名的
        "no-unused-vars": ["off"],
        "no-useless-constructor": ["off"],
        "camelcase": ["off"],
        "indent": ["off"],
        "no-undef": "off",
        "no-use-before-define": "off",
        "no-empty-function": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            "vars": "all",
            "args": "none",
            "ignoreRestSiblings": true
          }
        ],
        "@typescript-eslint/no-useless-constructor": ["error"],
        "@typescript-eslint/camelcase": [
          "error",
          {
            "properties": "never",
            "allow": ["^UNSAFE_"]
          }
        ],
        "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/array-type": [
          "error",
          {
            "default": "array-simple"
          }
        ],
        "@typescript-eslint/member-delimiter-style": ["error"],
        "@typescript-eslint/type-annotation-spacing": ["error"],
        "@typescript-eslint/prefer-for-of": ["error"],
        "@typescript-eslint/no-this-alias": [
          "warn",
          {
            "allowDestructuring": true
          }
        ],
        "@typescript-eslint/prefer-string-starts-ends-with": ["error"],
        "@typescript-eslint/prefer-includes": ["error"]
      }
    }
  ]
}
```

#### 创建 .eslintignore 文件

1，该文件主要用于告诉 eslint 检查时忽略的文件，具体配置如下：

```json
app/proxy*
coverage
dist
build
fntest
mocks
node_modules
spm_modules
test/fixtures
src/components/VideoClipper
*.config.js
```

#### 更改 package 中 lint 命令

1，具体修改如下：

```json
"lint": "eslint --fix --ext .js,.jsx,.ts,.tsx src -c .eslintrc"
```

#### 异常报错

1，TypeError: cli.isValidationError is not a function at Command.cli.makeCommand。

- 解决方式：升级 webpack-cli。

2，TypeError: Cannot read property 'tap' of undefined at HtmlWebpackPlugin.apply。

- 解决方式：将 html-webpack-plugin 版本问题导致，可将其降级成 4.5.1 版本。

3，UnhandledPromiseRejectionWarning: TypeError: expecting a function but got [object Undefined]

- 解决方式：由于没有安装 html-webpack-plugin，将其装上即可。

4，TypeError: this.getOptions is not a function at Object.lessLoader。

- 解决方式：该错误由于 less-loader 版本问题导致，可将其降级为：5.0.0 即可。

5，Can't resolve '@babel/runtime-corejs3/helpers/esm/classCallCheck'。

- 解决方式：安装 @babel/runtime-corejs3 即可。

6，Error: Failed to load plugin @typescript-eslint: Cannot find module 'eslint-plugin-@typescript-eslint'。

- 解决方式：该错误由于没有安装 eslint-loader 导致，安装即可。

### 详细配置及所需包名

#### 完整 webpack 配置

```js
const path = require("path");
// const { name, version } = require('./package.json');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const postcssNormalize = require("postcss-normalize");
const apiMocker = require("mocker-api");

const matchSVGSprite = /assets\/icons\/|components\/Base\/Icon\/icons\//;
const { ESLINT_LOADER_DISABLED } = process.env; // 通过环境变量禁用 eslint-loader

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  // const publicPath = devMode ? '/' : `//x.xxx.cn/${name}/${version}/`;

  return {
    entry: "./src/index.ts",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      // publicPath
    },

    // 生产模式下关闭map文件
    devtool: devMode ? "source-map" : "none",

    // 配置路径别名
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        $: path.resolve(__dirname, "./typings"),
      },
    },

    module: {
      rules: [
        !devMode && !ESLINT_LOADER_DISABLED
          ? {
              enforce: "pre",
              test: /\.jsx?|\.tsx?$/,
              include: path.resolve(__dirname, "src"),
              loader: "eslint-loader",
              options: {
                cache: true,
              },
            }
          : {},
        /**
         * 解析样式资源，需要安装style-loader、css-loader、less、less-loader、postcss-normalize
         */
        {
          test: /\.(css|less)$/,
          use: [
            devMode ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: "[name]__[local]",
                },
                importLoaders: 1,
              },
            },
            {
              loader: "less-loader",
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
            {
              loader: "px2rem-loader",
              options: {
                importLoaders: 1,
                remUnit: 37.5,
                min: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  ident: "postcss",
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        autoprefixer: {
                          flexbox: "no-2009",
                        },
                        stage: 3,
                      },
                    ],
                    postcssNormalize(),
                  ],
                },
                sourceMap: false,
              },
            },
          ],
        },
        /**
         * 使用babel-loader编译js|jsx|ts|tsx
         * 需要下载 @babel/core @babel/preset-env babel-loader
         * @babel/preset-react @babel/plugin-transform-runtime
         * ts-loader typescript
         */
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      modules: false,
                    },
                  ],
                  "@babel/preset-react",
                ],
                plugins: [
                  [
                    "@babel/plugin-transform-runtime",
                    {
                      useESModules: true,
                      corejs: 3,
                    },
                  ],
                ],
              },
            },
            {
              loader: "ts-loader",
              options: {
                happyPackMode: true,
                transpileOnly: true,
                compilerOptions: {
                  noEmit: false,
                  module: "esnext",
                  target: devMode ? "es2017" : "es5",
                },
              },
            },
          ],
          exclude: [/node_modules/],
        },
        /**
         * 打包图片资源，需要下载 url-loader html-loader file-loader
         */
        {
          test: /\.(mp4|png|jpg|jpeg|png|svg|cur|gif|webp|webm|otf)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "static/[name].[hash:11].[ext]",
              },
            },
          ],
          exclude: matchSVGSprite,
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        /**
         * 打包svg资源，需要下载 svg-sprite-loader(用于将svg图以img标签的形式引入)
         */
        {
          test: /\.svg$/,
          include: matchSVGSprite,
          use: [
            {
              loader: "svg-sprite-loader",
              options: {
                symbolId: "icon-[name]",
              },
            },
          ],
        },
      ],
    },

    /**
     * plugins配置，需要下载：html-webpack-plugin、mini-css-extract-plugin
     */
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "./src/index.ejs"),
        minify: {
          removeComments: true, // 移除注释
          collapseWhitespace: true, // 移除空格
        },
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].css",
      }),
      new OptimizeCSSAssetsPlugin(),
    ],

    /**
     * 热更新
     */
    devServer: {
      port: 8000,
      host: "localhost",
      // open: true,
      disableHostCheck: true,
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "http://test.bat.xinhuazhiyun.com",
          changeOrigin: true,
        },
      },
      before(app) {
        apiMocker(app, path.resolve(__dirname, "./mock/mock.js"));
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
      warningsFilter: (warning) => /Conflicting order between/gm.test(warning), // 排除掉匹配的告警信息
    },

    performance: {
      hints: "warning", // 枚举
      maxAssetSize: 30000000, // 整数类型（以字节为单位）
      maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
      assetFilter: function (assetFilename) {
        // 提供资源文件名的断言函数
        return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
      },
    },
  };
};
```

#### package.json 资源包

```json
{
  "private": true,
  "scripts": {
    "start": "webpack serve --mode=development --config=webpack.config.js --hot --inline",
    "build": "npm i && webpack --mode=production --progress",
    "lint": "eslint --fix --ext .js,.jsx,.ts,.tsx src -c .eslintrc",
    "precommit": "npm run lint"
  },
  "dependencies": {
    "dva": "^2.4.1",
    "react": "^16.2.0",
    "react-dom": "^16.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.13.10",
    "@babel/plugin-transform-runtime": "^7.13.10",
    "@babel/preset-env": "^7.13.12",
    "@babel/preset-react": "^7.12.13",
    "@babel/preset-typescript": "^7.13.0",
    "@babel/runtime-corejs3": "^7.13.10",
    "@typescript-eslint/eslint-plugin": "~2.6.1",
    "@typescript-eslint/parser": "~2.6.1",
    "babel-eslint": "^8.2.3",
    "babel-loader": "^8.2.2",
    "babel-plugin-dva-hmr": "^0.3.2",
    "css-loader": "^5.1.4",
    "eslint": "^5.3.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-loader": "~3.0.2",
    "eslint-plugin-import": "^2.17.3",
    "eslint-plugin-jsx-a11y": "^6.1.2",
    "eslint-plugin-react": "^7.16.0",
    "eslint-plugin-react-ext": "^0.1.0",
    "eslint-plugin-react-hooks": "^1.7.0",
    "file-loader": "^6.2.0",
    "html-loader": "^2.1.2",
    "html-webpack-plugin": "^4.5.1",
    "husky": "^0.12.0",
    "less": "^4.1.1",
    "less-loader": "^5.0.0",
    "lib-flexible": "^0.3.2",
    "mini-css-extract-plugin": "^1.3.9",
    "mocker-api": "^2.8.3",
    "optimize-css-assets-webpack-plugin": "^5.0.4",
    "postcss-normalize": "^9.0.0",
    "px2rem-loader": "^0.1.9",
    "redbox-react": "^1.4.3",
    "roadhog": "^2.5.0-beta.4",
    "style-loader": "^2.0.0",
    "svg-sprite-loader": "^6.0.2",
    "ts-loader": "^8.0.18",
    "typescript": "^4.2.3",
    "url-loader": "^4.1.1",
    "webpack": "^4.44.2",
    "webpack-cli": "^4.5.0",
    "webpack-dev-server": "^3.11.2"
  },
  "husky": {
    "hooks": {
      "pre-commit": "sh ./.git-hooks/pre-commit.sh"
    }
  }
}
```
