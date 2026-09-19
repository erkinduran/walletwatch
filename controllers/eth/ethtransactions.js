var Web3 = require ( 'web3' );
const config = require ( '../../config' );
var web3 = new Web3 ( config.ETH_RPC_URL );
if ( typeof web3 !== 'undefined' )
{
	web3 = new Web3 ( web3.currentProvider );
}
else
{
	// Set the provider you want from Web3.providers
	web3 = new Web3 ( new Web3.providers.HttpProvider ( config.ETH_RPC_URL ) );
}
const { get } = require ( '../../func' );

exports.ethtransactions = function ( req, res )
{
	const adres = req.body.adres;
	if ( adres )
	{
		get ( 'http://api.etherscan.io/api?module=account&action=txlist&address=' + adres + '&startblock=0&endblock=99999999&sort=asc&apikey=' + config.ETHERSCAN_API_KEY, r =>
		{
			const sonuc = [];
			for ( let i in r.data.result )
			{
				r.data.result[ i ].value = web3.utils.fromWei ( r.data.result[ i ].value );
			}
			res.send ( {
				'durum' : true,
				'mesaj' : r.data.result,
			} );
			return;
		} );
	}
	else
	{
		res.send ( {
			'durum' : false,
			'mesaj' : 'Parametre gönderin',
		} );
	}
};