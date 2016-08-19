# Marketplace sendbox

## Requirements
 - node v.5+
 - mongodb v.3.2.4

## Installation
```shell
git clone https://github.com/DScheglov/marketplace.git
cd marketplace
npm install
```

## Running
```shell
node server
```

## Debugging
1. Install `node-inspector` globally
```shell
sudo npm install -g node-inspector
```
2. Run it in dedicated thread:
```shell
node-inspector
```
3. Run marketplace server in debug mode
```shell
node --debug server
```
4. Start browser and open `http://localhost:8080`


## Initializing DB with send-box cases
```shell
node reset-db --case <case_name>
```

`case_name` is a folder name in `./fixtures` directory. Currently one of the
following:
 - `20-20-1` (default*)
 - `buy-whole-loan`
 - `many-commitments`

 **Warning**: you should update 'expired' fields in the buy-offers.js and
 sell-offers.js file in appropriate case.


## Placing Sell-offer

### Checking out Sell-offer status:
Request:
```shell
GET /api/v1/selloffers/57b2f17bbf2f1483d0bba6b2 HTTP/1.1
HOST: localhost:1337
```

Response:
```javascript
{  
   "_id":"57b2f17bbf2f1483d0bba6b2",
   "trader":{  
      "_id":"57b1ed6598b8be7cae69c365",
      "title":"Trader 1A",
      "code":"1A",
      "__v":0
   },
   "assetId":"loan-123",
   "assetClass":"IL;EUR;A",
   "bookValue":800,
   "totalAssetBookValue":800,
   "bookDate":"2016-08-15T00:00:00.000Z",
   "minPriceRate":1.1345,
   "maxSharedAPR":0.15,
   "status":"blank",
   "expired":"2016-09-14T00:00:00.000Z",
   "pendingCommitments":[  

   ],
   "traders":[  

   ],
   "relativeFlows":[  
      {  
         "value":0.12,
         "date":"2016-09-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2016-10-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2016-11-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2016-12-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-01-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-02-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-03-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-04-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-05-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-06-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-07-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-08-14T00:00:00.000Z"
      }
   ],
   "updated":"2016-08-19T08:30:52.071Z",
   "dividable":true
}
```

### Calling `place` method:
Request:
```shell
GET /api/v1/selloffers/57b2f17bbf2f1483d0bba6b2/place HTTP/1.1
HOST: localhost:1337
```

Response:
```javascript
{  
   "_id":"57b2f17bbf2f1483d0bba6b2",
   "trader":"57b1ed6598b8be7cae69c365",
   "assetId":"loan-123",
   "assetClass":"IL;EUR;A",
   "bookValue":0,
   "totalAssetBookValue":800,
   "bookDate":"2016-08-15T00:00:00.000Z",
   "minPriceRate":1.1345,
   "maxSharedAPR":0.15,
   "status":"closed",
   "expired":"2016-09-14T00:00:00.000Z",
   "__v":1,
   "cachedPrices":{  
      "r1300000000":1.343454832744419,
      "r1500000000":1.3293540325244033,
      "r1000000000":1.364972444074357,
      "r850000000":1.3758989331831384,
      "r1250000000":1.3470103693831093
   },
   "pendingCommitments":[  

   ],
   "traders":[  
      "57b2e4017db03c00cd5a9dbc",
      "57b2e4077db03c00cd5a9dbd",
      "57b2e40c7db03c00cd5a9dbe",
      "57b2e4137db03c00cd5a9dbf",
      "57b2e41a7db03c00cd5a9dc0",
      "57b2e4207db03c00cd5a9dc1",
      "57b2e4277db03c00cd5a9dc2",
      "57b2e42c7db03c00cd5a9dc3",
      "57b2e4327db03c00cd5a9dc4",
      "57b2e4397db03c00cd5a9dc5",
      "57b2e43f7db03c00cd5a9dc6",
      "57b2e4447db03c00cd5a9dc7",
      "57b2e4497db03c00cd5a9dc8",
      "57b2e4507db03c00cd5a9dc9",
      "57b2e4577db03c00cd5a9dca",
      "57b1ed7998b8be7cae69c366",
      "57b2e3ef7db03c00cd5a9db9",
      "57b2e3f57db03c00cd5a9dba"
   ],
   "relativeFlows":[  
      {  
         "value":0.12,
         "date":"2016-09-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2016-10-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2016-11-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2016-12-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-01-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-02-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-03-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-04-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-05-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-06-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-07-14T00:00:00.000Z"
      },
      {  
         "value":0.12,
         "date":"2017-08-14T00:00:00.000Z"
      }
   ],
   "updated":"2016-08-19T08:31:37.293Z",
   "dividable":true
}
```

Log:
```shell
57b6c3e8dcac48150973ea7f: loan-123 <=> IL-EUR-AB:6A -- inv: $155, aP: $151.74, bV: $112.65, ]> $3.26, -- made
57b6c3e8dcac48150973ea80: loan-123 <=> IL-EUR-AB:7A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e8dcac48150973ea81: loan-123 <=> IL-EUR-AB:8A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e8dcac48150973ea82: loan-123 <=> IL-EUR-AB:9A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e8dcac48150973ea83: loan-123 <=> IL-EUR-AB:10A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e8dcac48150973ea84: loan-123 <=> IL-EUR-AB:11A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e8dcac48150973ea85: loan-123 <=> IL-EUR-AB:12A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e8dcac48150973ea86: loan-123 <=> IL-EUR-AB:13A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e8dcac48150973ea87: loan-123 <=> IL-EUR-AB:14A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e8dcac48150973ea88: loan-123 <=> IL-EUR-AB:15A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e9dcac48150973ea89: loan-123 <=> IL-EUR-AB:16A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e9dcac48150973ea8a: loan-123 <=> IL-EUR-AB:17A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e9dcac48150973ea8b: loan-123 <=> IL-EUR-AB:18A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e9dcac48150973ea8c: loan-123 <=> IL-EUR-AB:19A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e9dcac48150973ea8d: loan-123 <=> IL-EUR-AB:20A -- inv: $24.99, aP: $24.34, bV: $18.31, ]> $0.65, -- made
57b6c3e9dcac48150973ea8e: loan-123 <=> 1A-P:1 -- inv: $9.99, aP: $9.83, bV: $7.32, ]> $0.16, -- made
57b6c3e9dcac48150973ea8f: loan-123 <=> 3A-P:3 -- inv: $299.99, aP: $295.26, bV: $219.78, ]> $4.73, -- made
57b6c3e9dcac48150973ea90: loan-123 <=> IL-EUR-AB:4A -- inv: $278.33, aP: $273.94, bV: $203.9100000000005, ]> $4.39, -- made
```


### Checking out commitments

Request:
```shell
GET /api/v1/commitments?sellOffer=57b2f17bbf2f1483d0bba6b2 HTTP/1.1
HOST: localhost:1337
```

Response:
```javascript
[  
   {  
      "_id":"57b6c3e8dcac48150973ea86",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b306e98cff26f1d0b50519",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e42c7db03c00cd5a9dc3",
         "title":"Trader 13A",
         "code":"13A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:13A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:36.937Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e8dcac48150973ea87",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b307008cff26f1d0b5051a",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4327db03c00cd5a9dc4",
         "title":"Trader 14A",
         "code":"14A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:14A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:36.976Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e8dcac48150973ea88",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b3072a8cff26f1d0b5051b",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4397db03c00cd5a9dc5",
         "title":"Trader 15A",
         "code":"15A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:15A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:37.010Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e9dcac48150973ea89",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b307398cff26f1d0b5051c",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e43f7db03c00cd5a9dc6",
         "title":"Trader 16A",
         "code":"16A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:16A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:37.049Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e9dcac48150973ea8a",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b307488cff26f1d0b5051d",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4447db03c00cd5a9dc7",
         "title":"Trader 17A",
         "code":"17A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:17A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:37.088Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e9dcac48150973ea8b",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b307598cff26f1d0b5051e",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4497db03c00cd5a9dc8",
         "title":"Trader 18A",
         "code":"18A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:18A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:37.123Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e9dcac48150973ea8c",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b3076b8cff26f1d0b5051f",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4507db03c00cd5a9dc9",
         "title":"Trader 19A",
         "code":"19A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:19A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:37.155Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e9dcac48150973ea8d",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b3077c8cff26f1d0b50520",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4577db03c00cd5a9dca",
         "title":"Trader 20A",
         "code":"20A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:20A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:37.185Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e9dcac48150973ea8e",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b1f0ea01a1d836af5a5c9c",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b1ed7998b8be7cae69c366",
         "title":"Trader 2A",
         "code":"2A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"1A-P:1",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:37.226Z",
      "intermediaryMargin":0.16,
      "assetPrice":9.83,
      "investment":9.99,
      "bookValue":7.32
   },
   {  
      "_id":"57b6c3e9dcac48150973ea8f",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b2e4ff7db03c00cd5a9dcc",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e3ef7db03c00cd5a9db9",
         "title":"Trader 3A",
         "code":"3A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"3A-P:3",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:37.270Z",
      "intermediaryMargin":4.73,
      "assetPrice":295.26,
      "investment":299.99,
      "bookValue":219.78
   },
   {  
      "_id":"57b6c3e9dcac48150973ea90",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b305b48cff26f1d0b50510",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e3f57db03c00cd5a9dba",
         "title":"Trader 4A",
         "code":"4A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:4A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:37.307Z",
      "intermediaryMargin":4.39,
      "assetPrice":273.94,
      "investment":278.33,
      "bookValue":203.9100000000005
   },
   {  
      "_id":"57b6c3e8dcac48150973ea7f",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b3062d8cff26f1d0b50512",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4017db03c00cd5a9dbc",
         "title":"Trader 6A",
         "code":"6A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:6A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:36.639Z",
      "intermediaryMargin":3.26,
      "assetPrice":151.74,
      "investment":155,
      "bookValue":112.65
   },
   {  
      "_id":"57b6c3e8dcac48150973ea80",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b306578cff26f1d0b50513",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4077db03c00cd5a9dbd",
         "title":"Trader 7A",
         "code":"7A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:7A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:36.695Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e8dcac48150973ea81",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b3066a8cff26f1d0b50514",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e40c7db03c00cd5a9dbe",
         "title":"Trader 8A",
         "code":"8A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:8A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:36.751Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e8dcac48150973ea82",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b306978cff26f1d0b50515",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4137db03c00cd5a9dbf",
         "title":"Trader 9A",
         "code":"9A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:9A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:36.778Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e8dcac48150973ea83",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b306a88cff26f1d0b50516",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e41a7db03c00cd5a9dc0",
         "title":"Trader 10A",
         "code":"10A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:10A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:36.816Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e8dcac48150973ea84",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b306b88cff26f1d0b50517",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4207db03c00cd5a9dc1",
         "title":"Trader 11A",
         "code":"11A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:11A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:36.855Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   },
   {  
      "_id":"57b6c3e8dcac48150973ea85",
      "sellOffer":"57b2f17bbf2f1483d0bba6b2",
      "buyOffer":"57b306ca8cff26f1d0b50518",
      "seller":{  
         "_id":"57b1ed6598b8be7cae69c365",
         "title":"Trader 1A",
         "code":"1A",
         "__v":0
      },
      "buyer":{  
         "_id":"57b2e4277db03c00cd5a9dc2",
         "title":"Trader 12A",
         "code":"12A",
         "__v":0
      },
      "assetId":"loan-123",
      "portfolioId":"IL-EUR-AB:12A",
      "status":"made",
      "__v":0,
      "updated":"2016-08-19T08:31:36.899Z",
      "intermediaryMargin":0.65,
      "assetPrice":24.34,
      "investment":24.99,
      "bookValue":18.31
   }
]
```
