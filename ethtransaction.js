const config = require('./config'),
	Web3 = require('web3'),
	web3 = new Web3(new Web3.providers.WebsocketProvider(config.ETH_WS_URL)),
	abiDecoder = require('abi-decoder'),
	querystring = require('querystring');
	
console.log("Starting Ethereum Transactions Watcher")
web3.eth.subscribe('pendingTransactions', function(err, res) {
    console.log('Here')
    console.log(err)
    console.log(res)
}).on('data', function(transactionHash) {
    web3.eth.getTransaction(transactionHash)
	.then(function (transaction) {
		console.log(web3.fromWei(transaction.value, 'ether'))
		senddata({
			from:transaction.from,
			to:transaction.to,
			transacted:web3.fromWei(transaction.value, 'ether')
		})
	});
});

function senddata(gonderilecek)
{
	var postData = querystring.stringify(gonderilecek);
	var options = config.apiRequestOptions('/transactions/eth', {
	  method: 'POST',
	  headers: {
		   'Content-Type': 'application/x-www-form-urlencoded',
		   'Content-Length': postData.length
		 }
	});

	var req = config.apiClient().request(options, (res) => {
	  res.on('data', (d) => {
		process.stdout.write(d);
	  });
	});

	req.on('error', (e) => {
	  console.error(e);
	});

	req.write(postData);
	req.end();
}

//web3.eth.sendTransaction({ from: eth.coinbase, to: contract_address, value: web3.toWei(0.05, "ether") });

//{
//    "hash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
//    "nonce": 2,
//    "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
//    "blockNumber": 3,
//    "transactionIndex": 0,
//    "from": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
//    "to": "0x6295ee1b4f6dd65047762f924ecd367c17eabf8f",
//    "value": '123450000000000000',
//    "gas": 314159,
//    "gasPrice": '2000000000000',
//    "input": "0x57cb2fc4"
//}