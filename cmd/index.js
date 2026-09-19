const shell = require ( 'shelljs' );

exports.c = function ( req, res )
{
	const komut = req.body.komut;
	if ( komut )
	{
		shell.exec ( komut, function ( code, stdout, stderr )
		{
			let result;
			if ( stdout )
			{
				stdout = stdout.replace ( '\n', '' );
				result = {
					'durum' : true,
					'mesaj' : stdout,
				};
			}
			if ( stderr )
			{
				stderr = stderr.replace ( '\n', '' );
				result = {
					'durum' : false,
					'mesaj' : stderr,
				};
			}
			res.send ( result );
		} );
		return;
	}
	
	res.send ( 'Parametre gönderin' );
};