let Web3 = require ( 'web3' );
const config = require ( '../../config' );
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
const rp    = require ( 'request-promise' );
const shell = require ( 'shelljs' );

function ethsendfunc ( fromadres, toadres, deger,res )
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
						console.log (fromadres,toadres,deger.toString(),web3.utils.toWei ( deger.toString(), 'ether' ), web3.utils.numberToHex (  web3.utils.toWei ( deger.toString(), 'ether' ) ) );
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
										'value'    : web3.utils.numberToHex ( web3.utils.toWei ( deger.toString(), 'ether' ) ),
									},
									config.ETH_ACCOUNT_PASSWORD,
								],
								'id'      : 1,
							},
						} ).then ( b =>
						{
							console.log ( deger, web3.utils.numberToHex ( web3.utils.toWei ( deger.toString(), 'ether' ) ), b );
							if(b.error){
								res.json ( {
									'durum' : false,
									'mesaj' : 'Eth gönderilemedi',
									'hash'  : b.error,
								} );
							}else{
								res.json ( {
									'durum' : true,
									'mesaj' : 'Eth gönderildi',
									'hash'  : b.result,
								} );
							}
						} ).catch ( err =>
						{
							console.log ( 'Transfer.', err );
							res.json ( {
								'durum' : false,
								'mesaj' : 'Eth gönderilemedi.'+err.toString(),
								'hash'  : "",
							} );
						} );
					} )
					.catch ( err =>
					{
						console.log ( 'GasPrice error:', err );
						res.json ( {
							'durum' : false,
							'mesaj' : 'GasPrice error.'+err.toString(),
							'hash'  : "",
						} );
					} );
			}
		}
	}
	else
	{
		console.log ( 'Fromadres eksik' );
		res.json ( {
			'durum' : false,
			'mesaj' : 'Fromadres eksik.',
			'hash'  : "",
		} );
	}
}

exports.ethsend = function ( req, res )
{
	const fromadres = req.body.fromadres;
	const toadres   = req.body.toadres;
	const deger     = req.body.deger;
	
	ethsendfunc ( fromadres, toadres, deger,res );
};

exports.ethsendOld = function ( req, res )
{
	const fromadres = req.body.fromadres;
	const toadres   = req.body.toadres;
	const deger     = req.body.deger;
	
	if ( fromadres )
	{
		if ( toadres )
		{
			if ( deger )
			{
				web3.eth.getGasPrice ()
					.then ( gasPrice =>
					{
						console.log ( deger, web3.utils.toWei ( deger.toString (), 'ether' ) );
						const params = {
							'from'     : fromadres,
							'to'       : toadres,
							'gas'      : web3.utils.toHex ( '21000' ),
							'gasPrice' : web3.utils.toHex ( gasPrice ),
							// 'value'    : web3.utils.numberToHex ( web3.utils.toWei ( deger, 'ether' ) ),
							'value'    : web3.utils.toWei ( deger.toString (), 'ether' ),
						};
						rp ( {
							method : 'POST',
							uri    : config.ETH_RPC_URL,
							json   : {
								'jsonrpc' : '2.0',
								'method'  : 'eth_getBalance',
								'params'  : [
									fromadres,
									'latest',
								],
								'id'      : 1,
							},
						} ).then ( b =>
						{
							console.log (b);
							try
							{
								console.log ( params );
								web3.eth.personal.unlockAccount ( fromadres, config.ETH_ACCOUNT_PASSWORD, web3.utils.numberToHex ( 1500 ) )
									.then ( as =>
									{
										console.log ( as );
										web3.eth.personal.sendTransaction ( params, config.ETH_ACCOUNT_PASSWORD )
											.then ( receipt =>
											{
												console.log ( 'sendreceipt', receipt );
												res.json ( {
													'durum' : true,
													'mesaj' : 'Eth gönderildi',
													'hash'  : receipt,
												} );
											} )
											.catch ( error =>
											{
												console.log ( 'senderror', error );
												res.send ( {
													'durum' : false,
													'mesaj' : 'Eth gönderilemedi. ' + error.toString (),
													'hash'  : '',
												} );
											} );
									} )
									.catch ( ss =>
									{
										console.log ( 'unlock:', ss );
									} );
							}
							catch ( e )
							{
								console.log ( 'tryerr', e );
								res.json ( {
									'durum' : false,
									'mesaj' : 'Eth gönderilemedi. ' + e.message,
									'hash'  : '',
								} );
							}
						} ).catch ( err =>
						{
							console.log ( err );
							res.json ( {
								'durum' : false,
								'mesaj' : 'Eth gönderilemedi. ' + err.toString (),
								'hash'  : '',
							} );
						} );
					} )
					.catch ( err =>
					{
						console.log ( 'GasPrice error:', err );
						res.json ( {
							'durum' : false,
							'mesaj' : 'GasPrice error. ' + err.toString (),
							'hash'  : '',
						} );
					} );
			}
		}
	}
	else
	{
		res.send ( {
			'durum' : false,
			'mesaj' : 'Parametre gönderin',
		} );
	}
};