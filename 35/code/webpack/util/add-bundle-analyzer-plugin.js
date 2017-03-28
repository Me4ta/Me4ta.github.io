import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
	analyzerMode: 'server',
	analyzerPort: 9999,
	reportFilename: 'report.html',
	openAnalyzer: true,
	generateStatsFile: true,
	statsFilename: 'stats.json',
	statsOptions: null,
	logLevel: 'info'
})

const addBundleAnalyzerPlugin = webpackConfig => (
	{
		...webpackConfig,
		plugins: [...webpackConfig.plugins, bundleAnalyzerPlugin]
	}
)

export default addBundleAnalyzerPlugin
