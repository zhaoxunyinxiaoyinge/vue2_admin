const path = require("path");
const { link } = require("fs");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = process.env.port || 80;

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,

  devServer: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    proxy: {
      '/list': {
        target: "http://v.juhe.cn",
         changeOrigin: true,
         pathRewrite: {
         "^/list": "",
        },
      },

      '/api/upload':{
        target:"http://localhost:7001/api/upload",
        changeOrigin:true,
        pathRewrite: {
          "^/api/upload": "",
         },
      },
      '/api/json':{
        target:"https://github.com",
        changeOrigin:true,
        pathRewrite: {
          "^/api/json": "",
         },
      },
    },
  },
  // 这里是配置一个vue的路径
  chainWebpack: (config) => {
    config.module.rules.delete("svg"); // 删除默认的svg处理的配置
    config.module
      .rule("assets")
      .test(/\.svg$/)
      .include.add(resolve("/src/assets/svgIcon")) //处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
    config.resolve.alias
      //这里是将一个路径设置为觉对路径!
      .set("@", resolve("src"))
      .set("components", resolve("src/components"))
      .set("common", resolve("src/common"))
      .set("API", resolve("src/api"))
      .set("assets", resolve("src/assets"))
      .set("store", resolve("src/store"));
    // 更据不同地环境加载不同地文件
    config.when(process.env.NODE_ENV == "production", (config) => {
      config
        .entry("app")
        .clear()
        .add("./src/main-prod.js");
      //配置文件实现cdn静态加载。
      config.set("externals", {
        vue: "Vue",
        "vue-router": "vueRouter",
        axios: "axios",
        echarts: "echarts",
        nprogress: "NProgress",
        "vue-quill-editor": "VueQuillEditor",
      });
      // 通过区分生产模式和开发模式，在webpackHtmlPlugin上添加一个参数，用于判别当前环境是开发环境还是生产环境
      config.plugin("html").tap((args) => {
        args[0].isProd = true;
        return args;
      });
    });
    config.when(process.env.NODE_ENV == "development", (config) => {
      config
        .entry("app")
        .clear()
        .add("./src/main-dev.js");
      // 通过区分生产模式和开发模式，在webpackHtmlPlugin上添加一个参数，用于判别当前环境是开发环境还是生产环境
      config.plugin("html").tap((args) => {
        args[0].isProd = false;
        return args;
      });
    });
  },
};
