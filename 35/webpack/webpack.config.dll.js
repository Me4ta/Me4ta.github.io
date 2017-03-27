import path from 'path'
import webpack from 'webpack'
import config from '../config/config'
import uglifyPlugin from './util/uglify-plugin'
import defaultLoaders from './util/default-loaders.js'

const dllConfig = {
	entry: {
		vendors: [path.join(config.sourceDir, config.dllFileName)],
		styles: [path.join(config.sourceDir, 'styles')]
	},
	output: {
		path: config.dllDir,
		filename: `[name].${process.env.NODE_ENV}.js`,
		library: '[name]'
	},
	module: {
		loaders: defaultLoaders
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(config.dllDir, `[name]-${process.env.NODE_ENV}-manifest.json`),
			name: '[name]',
			context: config.sourceDir
		})
	]
}

if (process.env.NODE_ENV === 'production') {
	dllConfig.plugins.push(uglifyPlugin)
}

export default dllConfig
