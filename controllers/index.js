const xrp               = require ( './xrp' );
const eth               = require ( './eth' );
const Client            = require ( 'bitcoin-core' );
const config            = require ( '../config' );
const ethoption         = {
	username : config.BTC_RPC_USERNAME,
	password : config.BTC_RPC_PASSWORD,
	port     : config.BTC_RPC_PORT,
};
const client            = new Client ( ethoption );
//Btc
exports.btclistaccounts = function ( req, res )
{
	client.listAccounts ().then ( ( help ) =>
	{
		res.send ( help );
	} ).catch ( e =>
	{
		console.log ( e );
		res.send ( 'Ops birşeyler ters gitti.' );
	} );
};
exports.btcsend         = function ( req, res )
{
	const account = req.body.account;
	const toadres = req.body.toadres;
	const amount  = req.body.amount;
	if ( account && toadres && amount )
	{
		try
		{
			//client.sendFrom("5327977382", "3NKzN88deGbhUv9SGSDJJVStkEKBpswqER", 0.00784).then((help) => {
			client.sendFrom ( account, toadres, amount ).then ( ( help ) =>
			{
				res.send ( help );
				return;
			}, ( error, receipt ) =>
			{
				if ( error )
				{
					console.log ( error );
					res.send ( {
						'durum' : false,
						'mesaj' : 'Btc gönderilemedi. ' + error.toString (),
						'hash'  : '',
					} );
				}
				else
				{
					console.log ( receipt );
					res.json ( {
						'durum' : true,
						'mesaj' : 'Btc gönderildi',
						'hash'  : receipt,
					} );
				}
				return;
			} );
		}
		catch ( e )
		{
			console.log ( e );
			res.send ( {
				'durum' : false,
				'mesaj' : 'Btc gönderilemedi. ' + e.toString (),
				'hash'  : '',
			} );
			return;
		}
		//const asd=web3.eth.accounts.create(req.body.id)
		//res.send( asd)
		return;
	}
	
	res.send ( 'Parametre gönderin' );
};

//Eth
exports.ethcreate       = eth.ethcreate;
exports.ethlist         = eth.ethlist;
exports.ethgetbalance   = eth.ethgetbalance;
exports.ethsend         = eth.ethsend;
exports.ethtransactions = eth.ethtransactions;
exports.ethlistbalance  = eth.ethlistbalance;
exports.addpeer         = eth.addpeer;
//Xrp
exports.xrpgetaddress   = xrp.xrpgetaddress;
exports.xrptransactions = xrp.transactions;
exports.xrpsend         = xrp.send;
exports.xrpgetinfo      = xrp.getinfo;

//Yardımcı
function ethgetTransactionsByAccount ( account )
{
	const endBlockNumber   = web3.eth.blockNumber;
	const startBlockNumber = endBlockNumber - 200;
	const result           = [];
	for ( var i = startBlockNumber; i <= endBlockNumber; i++ )
	{
		var block = web3.eth.getBlock ( i, true );
		if ( block != null && block.transactions != null )
		{
			block.transactions.forEach ( function ( e )
			{
				if ( account == '*' || account == e.from || account == e.to )
				{
					result.push ( {
						'hash'             : e.hash,
						'nonce'            : e.nonce,
						'blockHash'        : e.blockHash,
						'blockNumber'      : e.blockNumber,
						'transactionIndex' : e.transactionIndex,
						'from'             : e.from,
						'to'               : e.to,
						'value'            : e.value,
						'gasPrice'         : e.gasPrice,
						'gas'              : e.gas,
						'input'            : e.input,
					} );
				}
			} );
		}
	}
	
	return result;
}