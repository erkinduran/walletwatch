const config = require ( '../../config' );
const Web3 = require ( 'web3' );
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

exports.ethlistbalance = function ( req, res )
{
	let asd = {};
	web3.eth.getAccounts ().then ( e =>
	{
		for ( let i = 0; i < e.length; i++ )
		{
			web3.eth.getBalance ( e[ i ] ).then ( e =>
			{
				asd[ e[ i ] ] = web3.utils.fromWei ( e, 'ether' );
				if ( e.length - 1 === i ) res.send ( asd );
			} );
		}
	} ).catch ( err =>
	{
		console.log ( err );
		res.send ( asd );
	} );
};