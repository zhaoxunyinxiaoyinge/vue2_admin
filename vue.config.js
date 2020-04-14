const  path=require("path");
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
		.set("API",resolve("src/API"))
	}

}