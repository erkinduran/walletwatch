const RippleAPI         = require ( 'ripple-lib' ).RippleAPI;
const config            = require ( '../../config' );
const ANA_ADRES         = config.XRP_ADDRESS;
const api               = new RippleAPI ( {
	server : config.XRP_SERVER,
} );

exports.getinfo = function ( req, res )
{
	api.connect ().then ( () =>
	{
		return api.getAccountInfo ( ANA_ADRES );
	} ).then ( info =>
	{
		res.send ( info );
	} ).catch ( console.error );
};