const Hapi = require('hapi'),
			Inert = require('inert'),
			colors = require('colors'),
			Path = require('path'),
			publicPath = __dirname + '/public',
			initRoutes = require('./controllers/main')

const port = '1337'
const server = new Hapi.Server()

//Register Inert plugin for file and directory API
server.register(Inert, () => {})

server.connection({
	host: 'localhost',
	port,
	routes: {
		files: {
			relativeTo: Path.join(publicPath)
		}
	}
})

initRoutes(server)

server.start((err) => {
	if (err) {
		throw err;
	}

	const successMsg = '\nServer start success,  running at:'
	console.log(colors.bgBlack.bold.green(successMsg) + colors.bgBlack.blue.bold(port))
	
	if(+port === 1337 )
		console.warn(colors.yellow.bgBlack.underline('To Change port, edit the const "port" in the file ') + colors.bgBlack.bold.red('"server/app.js"'))
})