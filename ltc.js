var config = require('./config'),
    socket = require('socket.io-client')(config.LTC_INSIGHT_URL),
    request = require('request'),
    querystring = require('querystring'),
    loger = require('./loger'),
    fs = require('fs');
fs.writeFile(config.LOG_DIR + '/ltcinfo.txt', '', function () {
    console.log('info clear done')
})
fs.writeFile(config.LOG_DIR + '/ltcerror.txt', '', function () {
    console.log('error clear done')
})
fs.writeFile(config.LOG_DIR + '/ltcdebug.txt', '', function () {
    console.log('debug clear done')
})

loger.info("ltc", "LTC Listen Service Start..");
socket.on('connect', function () {
    // console.log('Connected to websocket');
    socket.emit('subscribe', 'inv');
});

socket.on('tx', function (data) {
    loger.info("ltc", "Kontrol: " + data.txid)
    request.get(config.LTC_INSIGHT_URL + '/api/tx/' + data.txid, function (err, head, body) {
        try {
            var json = JSON.parse(body);
            json.vout.forEach(function (vout) {
                if (vout.scriptPubKey && vout.scriptPubKey.addresses) {
                    vout.scriptPubKey.addresses.forEach(function (a) {
                        if (json.vin[0].addr) {
                            console.log(json.vin[0].addr);
                            //if a === myAddress
                            // senddata(data.txid, json.vin[0].addr, a, json.valueOut)
                        }
                    })
                }
            })
        } catch (e) {
            loger.error("ltc", "catch error: " + e.message);
        }
    });
});

socket.on('disconnect', function () {
    // console.log('Disconnected!');
});

function senddata(txid, from, to, adet) {
    loger.info("ltc", "txid: " + txid + "from: " + from + "to: " + to + "adet: " + adet);
    var gonderilecek = {
        txid: txid,
        from: from,
        to: to,
        adet: adet
    };
    var postData = querystring.stringify(gonderilecek);
    var options = config.apiRequestOptions('/transactions/ltc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    });

    var req = config.apiClient().request(options, (res) => {
        res.on('data', (d) => {
            process.stdout.write(d);
            loger.info("ltc", d);
        });
    });

    req.on('error', (e) => {
        console.error(e);
        loger.error("ltc", e);
    });

    req.write(postData);
    req.end();
}