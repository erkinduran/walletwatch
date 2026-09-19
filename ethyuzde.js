var Web3 = require('web3');
var config = require('./config');
var web3 = new Web3(config.ETH_RPC_URL);
var lastPercentage = 0;
var lastBlocksToGo = 0;
var timeInterval = 10000;
function check () {
    var percentage = web3.eth.syncing.currentBlock / web3.eth.syncing.highestBlock * 100;
    var percentagePerTime = percentage - lastPercentage;
    var blocksToGo = web3.eth.syncing.highestBlock - web3.eth.syncing.currentBlock;
    var bps = (lastBlocksToGo - blocksToGo) / (timeInterval / 1000)
    var etas = 100 / percentagePerTime * (timeInterval / 1000)

    var etaM = parseInt(etas / 60, 10);
    console.log(parseInt(percentage, 10) + '% ETA: ' + etaM + ' minutes @ ' + bps + 'bps');

    lastPercentage = percentage;
    lastBlocksToGo = blocksToGo;
}
setInterval(check, timeInterval);
check()