const config = require('./config'),
    Web3 = require('web3'),
    web3 = new Web3(new Web3.providers.WebsocketProvider(config.ETH_WS_URL)),
    axios = require("axios");

const get = async (url, callback) => {
    try {
        await axios.get(url)
            .then(callback);
    } catch (error) {
        console.error(error);
    }
};

const getbalances=()=>{
    get(config.apiUrl('/list/eth'), res => {
        const adresler = res.data
        get('https://api.etherscan.io/api?module=account&action=balancemulti&address=' + adresler.join() + '&tag=latest&apikey=' + config.ETHERSCAN_API_KEY, res => {
            const data = res.data
            const result = {
                "status": data.status,
                "result": []
            }
            for (let i in data.result) result.result[i] = {
                "account": data.result[i].account,
                "balance": web3.utils.fromWei(data.result[i].balance)
            }
            console.log(result);
        });
    });
}

getbalances();

// web3.eth.getBalance("0x9fcd0d95f9d094f40eba7ad82b04529d0d8da1d2")
//     .then(console.log);