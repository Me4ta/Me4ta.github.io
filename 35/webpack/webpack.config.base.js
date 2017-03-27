import path from 'path'
import webpack from 'webpack'
import config from '../config/config'
import cssMqpacker from 'css-mqpacker'
import autoprefixer from 'autoprefixer'

import defaultLoaders from './util/default-loaders.js'

export default {
	cache: true,
	entry: {
		app: path.join(config.sourceDir, 'index.js')
	},
	output: {
		path: config.buildDir,
		filename: '[name].js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: config.sourceDir,
			manifest: require(path.join(config.dllDir,
				`vendors-${process.env.NODE_ENV === 'development' ? 'development' : 'production'}-manifest.json`))
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({
						browsers: ['last 2 versions'],
						remove: false
					}),
					cssMqpacker()
				]
			}
		})
	],
	module: {
		loaders: defaultLoaders
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx'],
		alias: {
			style: path.join(config.sourceDir, 'style')
		}
	}
}
