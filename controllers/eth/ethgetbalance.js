const config = require ( '../../config' );
let Web3 = require ( 'web3' );
let web3 = new Web3 ( config.ETH_RPC_URL );
if ( typeof web3 !== 'undefined' )
{
	web3 = new Web3 ( web3.currentProvider );
}
else
{
	// Set the provider you want from Web3.providers
	web3 = new Web3 ( new Web3.providers.HttpProvider ( config.ETH_RPC_URL ) );
}

exports.ethgetbalance = function ( req, res )
{
	if ( req.body.id )
	{
		web3.eth.getBalance ( req.body.id ).then ( e =>
		{
			res.send ( web3.utils.fromWei ( e, 'ether' ) );
		} );
		return;
	}
	
	res.send ( 'Parametre gönderin' );
};