const RippleAPI         = require ( 'ripple-lib' ).RippleAPI;
const config            = require ( '../../config' );
const ANA_ADRES         = config.XRP_ADDRESS;
const api               = new RippleAPI ( {
	server : config.XRP_SERVER,
} );

exports.transactions = function ( req, res )
{
	api.connect ().then ( () =>
	{
		api.getTransactions ( ANA_ADRES ).then ( transaction =>
		{
			res.send ( transaction );
		} );
	} );
};