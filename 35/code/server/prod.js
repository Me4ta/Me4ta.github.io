import path from 'path'
import express from 'express'
import opener from 'opener'
import config from '../config/config.js'

const app = express()
app.use(express.static(config.buildDir))

app.use('*', (req, res, next) => {
	res.sendFile(path.join(config.buildDir, 'index.html'))
})

app.listen(3000, () => {
	console.log(`Listening at ${config.host}:${config.prodPort}`)
	opener(`http://${config.host}:${config.devPort}`)
})
