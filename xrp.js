const RippleAPI = require('ripple-lib').RippleAPI;
const config = require('./config');

const api = new RippleAPI({
    server: config.XRP_SERVER
});

const account = config.XRP_ADDRESS // Bildirim alinacak hesap (XRP_ADDRESS)
api.connect().then(() => {
    api.connection.on('transaction', (event) => {
        console.log(JSON.stringify(event, null, 2))
    })

    api.request('subscribe', {
        accounts: [account]
    }).then(response => {
        if (response.status === 'success') {
            console.log('Successfully subscribed')
        }
    }).catch(error => {
        console.error(error)
        // Handle `error`
    })
})
// api.connect().then(() => {
//     api.connection.on('transaction', (ev) => {
//         console.log(JSON.stringify(ev, null, 2))
//     })
//     return api.connection.request({
//         command: 'subscribe',
//         accounts: [address]
//     })
// })

// api.connect().then(() => {
//     api.getBalances(address).then(balances => {
//         console.log(JSON.stringify(balances, null, 2));
//         process.exit();
//     });
// });