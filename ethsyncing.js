let Web3 = require ( 'web3' );
const config = require ( './config' );
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
console.log ( 'girdi' );
web3.eth.isSyncing ( ( e, s ) =>
{
	if ( e ) console.log ( 'error', e );
	console.log ( s );
} );