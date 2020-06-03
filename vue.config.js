const  path=require("path");
function resolve(dir){
    return path.join(__dirname,dir);
}
// 这里是调试的情况
// var argv = require('minimist')(process.argv.slice(2));
// console.log(argv);
// { _: [ 'serve' ] }
module.exports={
    // 这里是配置一个vue的路径
    chainWebpack:(config)=>{
		config.resolve.alias
		//这里是将一个路径设置为觉对路径!
		.set("@",resolve("src"))
		.set("components",resolve("src/components"))
		.set("common",resolve("src/common"))
		.set("API",resolve("src/API"))
	}

}