const { xrpgetaddress } = require ( './xrpgetaddress' );
const { transactions }  = require ( './transactions' );
const { send }          = require ( './send' );
const { getinfo }       = require ( './getinfo' );
exports.xrpgetaddress   = xrpgetaddress;
exports.transactions    = transactions;
exports.send            = send;
exports.getinfo         = getinfo;