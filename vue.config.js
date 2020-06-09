'use strict';

const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

const ThemeColorReplacer = require('webpack-theme-color-replacer');
const forElementUI = require('webpack-theme-color-replacer/forElementUI');

//Vue核心配置
module.exports = {
  //基本路径
  publicPath:'/',
  //输出文件目录
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV === 'development',
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  // webpack配置
  configureWebpack: {
    module:{
      rules: [
        {
          test: /\.m?js$/,
          include: [
            resolve('src'),
            resolve('node_modules/element-ui/src'),
            resolve('node_modules/element-ui/packages')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      new ThemeColorReplacer({
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: forElementUI.getElementUISeries('#2264A0'),
        changeSelector: forElementUI.changeSelector
      })
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    // 清除已有的所有 loader
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('./src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
    const fileRule = config.module.rule('file');
    fileRule.uses.clear();
    fileRule
      .test(/\.svg$/)
      .exclude.add(resolve('./src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader');
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/element-variables.scss";`
      }
    },
    // 启用 CSS modules
    // requireModuleExtension: false,
    // 是否使用 CSS 分离插件
    extract: true,
    // 开启 CSS source maps, 一般不建议开启
    sourceMap: false
  },
  // webpack-dev-server
  devServer: {
    port: 8055,
    disableHostCheck: true
  }
};
