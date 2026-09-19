# walletwatch

BTC, LTC, ETH ve XRP cüzdanlarını izleyen ve temel cüzdan işlemlerini
(adres oluşturma, bakiye sorgulama, transfer) REST üzerinden açan küçük bir
Node.js servisi. Zincir üzerindeki hareketleri yakalayıp yapılandırılan
backend API'ye bildirir.

> Arşiv niteliğinde eski bir proje. Bağımlılıkları 2019 dönemine ait
> (web3 1.0.0-beta, ripple-lib 1.x) ve güncel değildir.

## Kurulum

```bash
npm install
cp .env.example .env   # değerleri doldur
node server.js
```

## Yapılandırma

Tüm ayarlar ortam değişkenlerinden okunur; tek giriş noktası `config.js`.
`.env` dosyası varsa otomatik yüklenir (bkz. `.env.example`).

| Değişken | Açıklama |
|---|---|
| `API_BASE_URL` | Transaction/bakiye bildirimlerinin POST edildiği backend |
| `PORT` | REST API portu (varsayılan 3999) |
| `LOG_DIR` | Log dizini (varsayılan `./logs`) |
| `ETH_RPC_URL` / `ETH_WS_URL` | Ethereum node adresleri |
| `ETH_ACCOUNT_PASSWORD` | `personal_*` çağrıları için hesap parolası |
| `ETH_MAIN_ACCOUNT` | Bakiyelerin toplandığı ana ETH adresi |
| `ETH_PEER_ENODE` | `/eth/addpeer` ile eklenen enode |
| `ETHERSCAN_API_KEY` | Etherscan API anahtarı |
| `BTC_RPC_USERNAME` / `BTC_RPC_PASSWORD` / `BTC_RPC_PORT` | Bitcoin JSON-RPC erişimi |
| `BTC_INSIGHT_URL` / `LTC_INSIGHT_URL` | Insight explorer websocket/API adresleri |
| `XRP_SERVER` / `XRP_ADDRESS` / `XRP_SECRET` | Ripple node, ana adres ve cüzdan secret'ı |

Hiçbir gizli bilgi kodda gömülü değildir; `.env` git'e dahil edilmez.

## Servisler

| Dosya | İş |
|---|---|
| `server.js` | REST API (rotalar `routes.js` içinde) |
| `btc.js` / `ltc.js` | Insight websocket'ini dinler, eşleşen tx'leri API'ye bildirir |
| `ethtransaction.js` | Pending ETH transaction'larını dinler |
| `ethbalance.js` | ETH adres bakiyelerini periyodik olarak API'ye gönderir |
| `eth.js` | Alt hesaplardaki bakiyeyi ana hesaba süpürür |
| `ethsyncing.js` / `ethyuzde.js` | Node senkronizasyon durumu |

## API

| Method | Yol | Açıklama |
|---|---|---|
| POST | `/eth/create` | Yeni ETH hesabı |
| POST | `/eth/list` | Hesap listesi |
| POST | `/eth/balance` | Adres bakiyesi |
| POST | `/eth/listbalance` | Tüm hesapların bakiyesi |
| POST | `/eth/send` | ETH transferi |
| POST | `/eth/transactions` | Adresin işlem geçmişi |
| POST | `/eth/addpeer` | Node'a peer ekler |
| POST | `/btc/listaccounts` | BTC hesapları |
| POST | `/btc/send` | BTC transferi |
| POST | `/xrp/getaddress` | Ana XRP adresi |
| POST | `/xrp/getinfo` | Hesap bilgisi |
| POST | `/xrp/transactions` | İşlem geçmişi |
| POST | `/xrp/send` | XRP transferi |

## Güvenlik notu

`POST /cmd` endpoint'i (`cmd/index.js`) gönderilen komutu sunucu üzerinde
doğrudan çalıştırır ve hiçbir kimlik doğrulaması yoktur. API'nin tamamı
kimlik doğrulamasızdır; bu servis yalnızca kapalı bir ağda çalışacak şekilde
tasarlanmıştı. Olduğu gibi internete açmayın.
