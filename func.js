const axios          = require ( 'axios' ),
	  XMLHttpRequest = require ( 'xmlhttprequest' ).XMLHttpRequest;

const get = async ( url, callback ) =>
{
	try
	{
		await axios.get ( url )
				   .then ( callback );
	}
	catch ( error )
	{
		console.error ( error );
	}
};

const post = async ( url, data, callback ) =>
{
	try
	{
		var xhr = new XMLHttpRequest ();
		xhr.open ( 'POST', url, true );
		xhr.setRequestHeader ( 'Content-Type', 'application/json' );
		xhr.onreadystatechange = function ()
		{
			if ( xhr.readyState === 4 && xhr.status === 200 )
			{
				callback ( xhr.responseText );
			}
		};
		data                   = JSON.stringify ( data );
		xhr.send ( data );
	}
	catch ( error )
	{
		console.error ( error );
	}
};


module.exports = {
	get  : get,
	post : post,
};