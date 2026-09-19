const Client = require('bitcoin-core');
const config = require('./config');
const client = new Client({
    username: config.BTC_RPC_USERNAME,
    password: config.BTC_RPC_PASSWORD,
    port: config.BTC_RPC_PORT
});

const mainWalletBalance = client.getBalance();

console.log(mainWalletBalance);