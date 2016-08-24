const ObjectId = require("mongoose").Types.ObjectId;
const ISODate = (d) => new Date(d);

module.exports = exports = [
  {
    "_id" : ObjectId("57b1f0ea01a1d836af5a5c9c"),
    "trader" : ObjectId("57b1ed7998b8be7cae69c366"),
    "portfolioId" : "1A-P:1",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.13,
    "maxPriceRate" : 1.2,
    "maxInvestmentPerLoan" : 1000,
    "status" : "blank",
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0,
    "expired" : ISODate("2016-12-31")
  }, {
    "_id" : ObjectId("57b2e4ff7db03c00cd5a9dcc"),
    "trader" : ObjectId("57b2e3ef7db03c00cd5a9db9"),
    "portfolioId" : "3A-P:1",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.13,
    "maxPriceRate" : 1.2,
    "maxInvestmentPerLoan" : 45000,
    "status" : "placed",
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0,
    "expired" : ISODate("2016-12-31")
  }, {
    "_id" : ObjectId("57b3058f8cff26f1d0b5050f"),
    "trader" : ObjectId("57b2e3ef7db03c00cd5a9db9"),
    "portfolioId" : "IL-EUR-AB:3A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.13,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 5000,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b305b48cff26f1d0b50510"),
    "trader" : ObjectId("57b2e3f57db03c00cd5a9dba"),
    "portfolioId" : "IL-EUR-AB:4A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.13,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 30000,
    "status" : "placed",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b305f68cff26f1d0b50511"),
    "trader" : ObjectId("57b2e3fb7db03c00cd5a9dbb"),
    "portfolioId" : "IL-EUR-AB:5A",
    "volume" : 200000,
    "APR" : 0.08,
    "intermediaryAPR" : 0.09,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 10000,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b3062d8cff26f1d0b50512"),
    "trader" : ObjectId("57b2e4017db03c00cd5a9dbc"),
    "portfolioId" : "IL-EUR-AB:6A",
    "volume" : 200000,
    "APR" : 0.085,
    "intermediaryAPR" : 0.125,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 15500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b306578cff26f1d0b50513"),
    "trader" : ObjectId("57b2e4077db03c00cd5a9dbd"),
    "portfolioId" : "IL-EUR-AB:7A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b3066a8cff26f1d0b50514"),
    "trader" : ObjectId("57b2e40c7db03c00cd5a9dbe"),
    "portfolioId" : "IL-EUR-AB:8A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b306978cff26f1d0b50515"),
    "trader" : ObjectId("57b2e4137db03c00cd5a9dbf"),
    "portfolioId" : "IL-EUR-AB:9A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b306a88cff26f1d0b50516"),
    "trader" : ObjectId("57b2e41a7db03c00cd5a9dc0"),
    "portfolioId" : "IL-EUR-AB:10A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b306b88cff26f1d0b50517"),
    "trader" : ObjectId("57b2e4207db03c00cd5a9dc1"),
    "portfolioId" : "IL-EUR-AB:11A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b306ca8cff26f1d0b50518"),
    "trader" : ObjectId("57b2e4277db03c00cd5a9dc2"),
    "portfolioId" : "IL-EUR-AB:12A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b306e98cff26f1d0b50519"),
    "trader" : ObjectId("57b2e42c7db03c00cd5a9dc3"),
    "portfolioId" : "IL-EUR-AB:13A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b307008cff26f1d0b5051a"),
    "trader" : ObjectId("57b2e4327db03c00cd5a9dc4"),
    "portfolioId" : "IL-EUR-AB:14A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b3072a8cff26f1d0b5051b"),
    "trader" : ObjectId("57b2e4397db03c00cd5a9dc5"),
    "portfolioId" : "IL-EUR-AB:15A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b307398cff26f1d0b5051c"),
    "trader" : ObjectId("57b2e43f7db03c00cd5a9dc6"),
    "portfolioId" : "IL-EUR-AB:16A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b307488cff26f1d0b5051d"),
    "trader" : ObjectId("57b2e4447db03c00cd5a9dc7"),
    "portfolioId" : "IL-EUR-AB:17A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b307598cff26f1d0b5051e"),
    "trader" : ObjectId("57b2e4497db03c00cd5a9dc8"),
    "portfolioId" : "IL-EUR-AB:18A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b3076b8cff26f1d0b5051f"),
    "trader" : ObjectId("57b2e4507db03c00cd5a9dc9"),
    "portfolioId" : "IL-EUR-AB:19A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }, {
    "_id" : ObjectId("57b3077c8cff26f1d0b50520"),
    "trader" : ObjectId("57b2e4577db03c00cd5a9dca"),
    "portfolioId" : "IL-EUR-AB:20A",
    "volume" : 200000,
    "APR" : 0.1,
    "intermediaryAPR" : 0.15,
    "maxPriceRate" : 1.25,
    "maxInvestmentPerLoan" : 2500,
    "status" : "blank",
    "expired" : ISODate("2016-12-31"),
    "pendingCommitments" : [ ],
    "buyWholeAsset" : false,
    "assetClasses" : [
      "IL;EUR;A",
      "IL;EUR;B"
    ],
    "__v" : 0
  }
]
