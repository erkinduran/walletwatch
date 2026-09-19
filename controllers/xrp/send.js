const RippleAPI         = require ( 'ripple-lib' ).RippleAPI;
const config            = require ( '../../config' );
const ANA_ADRES         = config.XRP_ADDRESS;
const SECRET            = config.XRP_SECRET;
const api               = new RippleAPI ( {
	server : config.XRP_SERVER,
} );

exports.send = function ( req, res )
{
	let toadres          = req.body.toadres;
	toadres              = toadres.replace ( ' ', '' );
	const amount         = req.body.amount;
	const destinationTag = req.body.destinationTag;
	const currency       = 'XRP';
	
	if ( destinationTag && toadres && amount )
	{
		const payment = {
			source      : {
				address   : ANA_ADRES,
				maxAmount : {
					value    : amount.toString (),
					currency : currency,
				},
			},
			destination : {
				address : toadres,
				tag     : parseInt ( destinationTag ),
				amount  : {
					value    : amount.toString (),
					currency : currency,
				},
			},
		};
		api.connect ().then ( () =>
		{
			api.preparePayment ( ANA_ADRES, payment, {
				maxLedgerVersionOffset : 5,
			} ).then ( prepared =>
			{
				const {
						  signedTransaction,
						  id,
					  } = api.sign ( prepared.txJSON, SECRET );
				api.submit ( signedTransaction ).then ( result =>
				{
					if ( result.engine_result === 'tesSUCCESS' )
					{
						res.send ( {
							'durum' : true,
							'mesaj' : result,
							'txid'  : id,
						} );
					}
					else
					{
						res.send ( {
							'durum' : false,
							'mesaj' : 'Gönderilemedi. Bakiye yetersiz.',
							'txid'  : '',
						} );
					}
					api.disconnect ();
				} ).catch ( e =>
				{
					console.log ( e );
					res.send ( {
						'durum' : false,
						'mesaj' : 'Gönderilemedi. ' + e.toString (),
						'txid'  : '',
					} );
				} );
			} );
		} ).catch ( console.error );
	}
	else
	{
		res.send ( 'Parametre gönderin' );
	}
};