const config = require ( './config' );
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
const rp       = require ( 'request-promise' );
const anahesap = config.ETH_MAIN_ACCOUNT;
let asd        = {};
web3.eth.getAccounts ()
	.then ( e =>
	{
		for ( let i = 0; i < e.length; i++ )
		{
			web3.eth.getBalance ( e[ i ] ).then ( balance =>
			{
				if ( anahesap !== e[ i ] )
				{
					const minorbalance = web3.utils.fromWei ( balance, 'ether' );
					if ( minorbalance > 0 )
					{
						console.log ( 'ok', minorbalance );
						ethsendfunc ( e[ i ], anahesap, balance );
					}
					asd[ e[ i ] ] = minorbalance;
					if ( e.length - 1 === i ) console.log ( asd );
					// console.log ( e.length, i );
				}
			} );
		}
	} )
	.catch ( err =>
	{
		console.log ( err );
	} );

function ethsendfunc ( fromadres, toadres, deger )
{
	if ( fromadres )
	{
		if ( toadres )
		{
			if ( deger )
			{
				web3.eth.getGasPrice ()
					.then ( gasPrice =>
					{
						console.log ( web3.utils.numberToHex ( deger ) );
						rp ( {
							method : 'POST',
							uri    : config.ETH_RPC_URL,
							json   : {
								'jsonrpc' : '2.0',
								'method'  : 'personal_sendTransaction',
								'params'  : [
									{
										'from'     : fromadres,
										'to'       : toadres,
										'gas'      : web3.utils.toHex ( '21000' ),
										'gasPrice' : web3.utils.toHex ( gasPrice ),
										// 'value'    : web3.utils.toWei ( deger, 'ether' ),
										'value'    : web3.utils.numberToHex ( ( deger - ( gasPrice * 21000 ) ) ),
									},
									config.ETH_ACCOUNT_PASSWORD,
								],
								'id'      : 1,
							},
						} ).then ( b =>
						{
							console.log ( web3.utils.fromWei ( deger ), web3.utils.numberToHex ( deger ), b );
						} ).catch ( err =>
						{
							console.log ( 'Transfer.', err );
						} );
					} )
					.catch ( err =>
					{
						console.log ( 'GasPrice error:', err );
					} );
			}
		}
	}
	else
	{
		console.log ( 'Fromadres eksik' );
	}
}