const HtmlWebpackPlugin = require('html-webpack-plugin');
new HtmlWebpackPlugin({
	filename: 'index.html', // 最终创建的文件名
	template: path.join(__dirname, 'public/index.html') // 指定模板路径
}),