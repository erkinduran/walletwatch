// Tüm ortam değişkenleri tek yerden okunur.
// `.env` dosyası varsa yüklenir; dotenv kurulu değilse sessizce atlanır.
try
{
	require ( 'dotenv' ).config ();
}
catch ( e )
{
	// dotenv opsiyonel, değerler process.env üzerinden de verilebilir
}

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

// Base url'in path kısmını koruyarak tam yol üretir: apiPath('/transactions/btc')
function apiPath ( path )
{
	const base = new URL ( API_BASE_URL );
	const prefix = base.pathname.replace ( /\/$/, '' );
	
	return prefix + path;
}

// http/https modülünü ve request options'ı base url'e göre hazırlar
function apiRequestOptions ( path, options )
{
	const base = new URL ( API_BASE_URL );
	
	return Object.assign ( {
		hostname : base.hostname,
		port     : base.port || ( base.protocol === 'https:' ? 443 : 80 ),
		path     : apiPath ( path ),
	}, options );
}

// Base url'in protokolüne göre http ya da https modülünü döner
function apiClient ()
{
	return new URL ( API_BASE_URL ).protocol === 'https:'
		? require ( 'https' )
		: require ( 'http' );
}

module.exports = {
	// Backend API
	API_BASE_URL         : API_BASE_URL,
	apiPath              : apiPath,
	apiRequestOptions    : apiRequestOptions,
	apiClient            : apiClient,
	apiUrl               : path => API_BASE_URL.replace ( /\/$/, '' ) + path,
	
	// Sunucu
	PORT                 : process.env.PORT || 3999,
	LOG_DIR              : process.env.LOG_DIR || __dirname + '/logs',
	
	// Ethereum node
	ETH_RPC_URL          : process.env.ETH_RPC_URL || 'http://localhost:8547',
	ETH_WS_URL           : process.env.ETH_WS_URL || 'ws://localhost:8547',
	ETH_ACCOUNT_PASSWORD : process.env.ETH_ACCOUNT_PASSWORD || '',
	ETH_MAIN_ACCOUNT     : process.env.ETH_MAIN_ACCOUNT || '',
	ETH_PEER_ENODE       : process.env.ETH_PEER_ENODE || '',
	ETHERSCAN_API_KEY    : process.env.ETHERSCAN_API_KEY || '',
	
	// Bitcoin / Litecoin node (JSON-RPC)
	BTC_RPC_USERNAME     : process.env.BTC_RPC_USERNAME || '',
	BTC_RPC_PASSWORD     : process.env.BTC_RPC_PASSWORD || '',
	BTC_RPC_PORT         : parseInt ( process.env.BTC_RPC_PORT || '8332', 10 ),
	BTC_INSIGHT_URL      : process.env.BTC_INSIGHT_URL || 'https://insight.bitpay.com',
	LTC_INSIGHT_URL      : process.env.LTC_INSIGHT_URL || 'https://insight.litecore.io',
	
	// Ripple
	XRP_SERVER           : process.env.XRP_SERVER || 'wss://s2.ripple.com:443',
	XRP_ADDRESS          : process.env.XRP_ADDRESS || '',
	XRP_SECRET           : process.env.XRP_SECRET || '',
};
