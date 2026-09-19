var Web3                  = require ( 'web3' );
const config              = require ( '../../config' );
var web3                  = new Web3 ( config.ETH_RPC_URL );
const { ethcreate }       = require ( './ethcreate' );
const { ethlist }         = require ( './ethlist' );
const { ethgetbalance }   = require ( './ethgetbalance' );
const { ethsend }         = require ( './ethsend' );
const { ethtransactions } = require ( './ethtransactions' );
const { ethlistbalance }  = require ( './ethlistbalance' );
if ( typeof web3 !== 'undefined' )
{
	web3 = new Web3 ( web3.currentProvider );
}
else
{
	web3 = new Web3 ( new Web3.providers.HttpProvider ( config.ETH_RPC_URL ) );
}
exports.web3            = web3;
exports.ethcreate       = ethcreate;
exports.ethlist         = ethlist;
exports.ethgetbalance   = ethgetbalance;
exports.ethsend         = ethsend;
exports.ethtransactions = ethtransactions;
exports.ethlistbalance  = ethlistbalance;

exports.addpeer = function ()
{
	web3.admin.addPeer ( config.ETH_PEER_ENODE );
};