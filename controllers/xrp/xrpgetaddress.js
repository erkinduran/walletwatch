const RippleAPI         = require ( 'ripple-lib' ).RippleAPI;
const config            = require ( '../../config' );
const ANA_ADRES         = config.XRP_ADDRESS;
const api               = new RippleAPI ( {
	server : config.XRP_SERVER,
} );

exports.xrpgetaddress = function ( req, res )
{
	if ( req.body.account )
	{
		res.send ( {
			'adres' : ANA_ADRES,
		} );
		return;
	}
	
	res.send ( 'Parametre gönderin' );
};