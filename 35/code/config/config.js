import path from 'path'

export default {
	sourceDir: path.resolve(path.join(__dirname, '/../src')),
	buildDir: path.resolve(path.join(__dirname, '/../build')),
	dllDir: path.join(path.resolve(path.join(__dirname, '/../node_modules')), '_dll'),
	dllFileName: 'vendors.js',
	devPort: 3000,
	prodPort: 8080,
	host: 'localhost'
}
