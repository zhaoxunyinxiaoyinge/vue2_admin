const  path=require("path");
const { link } = require("fs");
function resolve(dir){
    return path.join(__dirname,dir);
}

module.exports={
    // 这里是配置一个vue的路径
    chainWebpack:(config)=>{
		config.resolve.alias
		//这里是将一个路径设置为觉对路径!
		.set("@",resolve("src"))
		.set("components",resolve("src/components"))
		.set("common",resolve("src/common"))
		.set("API",resolve("src/API"));
		// 更据不同地环境加载不同地文件
		config.when(process.env.NODE_ENV=="production",config=>{
			config.entry("app").clear().add("./src/main-prod.js");
		//配置文件实现cdn静态加载。
		config.set("externals",{
			"vue":"Vue",
			"vue-router":"vueRouter",
			"axios":"axios",
			"echarts":"echarts",
			"nprogress":"NProgress",
			"vue-quill-editor":"VueQuillEditor"
			})
		// 通过区分生产模式和开发模式，在webpackHtmlPlugin上添加一个参数，用于判别当前环境是开发环境还是生产环境
		config.plugin("html").tap(args=>{
			args[0].isProd=true;
			return args;
			})
		})
		config.when(process.env.NODE_ENV=="development",config=>{
			console.log("456")
			config.entry("app").clear().add("./src/main-dev.js");
		// 通过区分生产模式和开发模式，在webpackHtmlPlugin上添加一个参数，用于判别当前环境是开发环境还是生产环境	
			config.plugin("html").tap(args=>{
				args[0].isProd=false;
				return args;
				})
		})
	}
}




