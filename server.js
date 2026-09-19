const express = require('express'),
	config = require('./config'),
	app = express(),
	port = config.PORT,
	bodyParser = require('body-parser'),
	routes = require('./routes');
	
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('Content-Type', 'text/json');

routes(app);

app.listen(port);

console.log('Wallet RESTful API server started on: ' + port);