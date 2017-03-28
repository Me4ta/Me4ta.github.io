import path from 'path'
import express from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import opener from 'opener'
import webpackConfig from '../webpack/webpack.config.dev.js'
import config from '../config/config.js'
import api from './api'
import bodyParser from 'body-parser'
import logger from 'morgan'

const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({	extended: true }))
app.use(bodyParser.json())

app.all('/*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
	if (req.method === 'OPTIONS') {
		res.status(200).end()
	} else {
		next()
	}
})

const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true,
	stats: {
		colors: true
	}
}))

app.use(webpackHotMiddleware(compiler))

app.use('/node_modules', express.static(path.resolve(__dirname + '/../node_modules')))

// placeholder for future API
app.use('/api/1/', api)

// make all URLs respond with hot-wired index.html
app.use('*', (req, res, next) => {
	// res.send('Hello, world!')
	var filename = path.join(compiler.outputPath, 'index.html')
	compiler.outputFileSystem.readFile(filename, (err, result) => {
		if (err) {
			return next(err)
		}
		res.set('content-type', 'text/html')
		res.send(result)
		res.end()
	})
})

app.listen(3000, () => {
	console.log(`Listening at ${config.host}:${config.devPort}`)
	opener(`http://${config.host}:${config.devPort}`)
})
