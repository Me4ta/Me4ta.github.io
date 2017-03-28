import config from '../../config/config'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default new HtmlWebpackPlugin({
	env: process.env.NODE_ENV,
	hash: true,
	filename: 'index.html',
	template: path.join(config.sourceDir, 'index.ejs')
})
