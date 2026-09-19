const { get, post } = require ( './func' );
const config        = require ( './config' );

const getbalances = () =>
{
	get ( config.apiUrl ( '/list/eth' ), res =>
	{
		const adresler = res.data;
		get ( 'https://api.etherscan.io/api?module=account&action=balancemulti&address=' + adresler.join () + '&tag=latest&apikey=' + config.ETHERSCAN_API_KEY, res =>
		{
			const data   = res.data;
			const result = [];
			for ( let i in data.result ) result[ i ] = {
				'account' : data.result[ i ].account,
				'balance' : web3.utils.fromWei ( data.result[ i ].balance ),
			};
			post ( config.apiUrl ( '/balance/eth' ), {
				data : result,
			}, res =>
			{
				console.log ( res );
			} );
		} );
	} );
};

const gettransactions = () =>
{
	get ( config.apiUrl ( '/list/eth' ), res =>
	{
		const adresler = res.data;
		get ( 'https://api.etherscan.io/api?module=account&action=balancemulti&address=' + adresler.join () + '&tag=latest&apikey=' + config.ETHERSCAN_API_KEY, res =>
		{
			const data   = res.data;
			const result = [];
			for ( let i in data.result ) result[ i ] = {
				'account' : data.result[ i ].account,
				'balance' : web3.utils.fromWei ( data.result[ i ].balance ),
			};
			post ( config.apiUrl ( '/balance/eth' ), {
				data : result,
			}, res =>
			{
				console.log ( res );
			} );
		} );
	} );
};

getbalances ();

setInterval ( getbalances, 5000 );