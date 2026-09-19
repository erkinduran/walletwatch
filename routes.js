module.exports = function ( app )
{
	const coins = require ( './controllers' );
	const nu    = require ( './cmd' );
	
	app.get ( '/', function ( req, res )
	{
		res.send ( 'System Status: Success' );
	} );
	
	app.post ( '/', function ( req, res )
	{
		res.send ( 'System Status: Success' );
	} );
	
	app.post ( '/eth/create', coins.ethcreate );
	
	app.post ( '/eth/send', coins.ethsend );
	
	app.post ( '/eth/list', coins.ethlist );
	
	app.post ( '/eth/listbalance', coins.ethlistbalance );
	
	app.post ( '/eth/balance', coins.ethgetbalance );
	
	app.post ( '/eth/transactions', coins.ethtransactions );
	
	app.post ( '/eth/addpeer', coins.addpeer );
	
	app.post ( '/xrp/getaddress', coins.xrpgetaddress );
	
	app.post ( '/xrp/transactions', coins.xrptransactions );
	
	app.post ( '/xrp/send', coins.xrpsend );
	
	app.post ( '/xrp/getinfo', coins.xrpgetinfo );
	
	app.post ( '/btc/listaccounts', coins.btclistaccounts );
	
	app.post ( '/btc/send', coins.btcsend );
	
	app.post ( '/cmd', nu.c );
};