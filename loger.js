const fs = require('fs');
const config = require('./config');

function info(coin, msg) {
	const message = new Date().toISOString() + ' : ' + msg + '\n';
	const infoStream = fs.createWriteStream(config.LOG_DIR + '/' + coin + 'info.txt');
	infoStream.write(message);
}

function debug(coin, msg) {
	const message = new Date().toISOString() + ' : ' + msg + '\n';
	const debugStream = fs.createWriteStream(config.LOG_DIR + '/' + coin + 'debug.txt');
	debugStream.write(message);
}

function error(coin, msg) {
	const message = new Date().toISOString() + ' : ' + msg + '\n';
	const errorStream = fs.createWriteStream(config.LOG_DIR + '/' + coin + 'error.txt');
	errorStream.write(message);
}

module.exports = {
	info: info,
	debug: debug,
	error: error,
};