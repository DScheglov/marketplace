const ObjectId = require("mongoose").Types.ObjectId;
const ISODate = (d) => new Date(d);

module.exports = exports = [
  {
    "_id" : ObjectId("57b2f17bbf2f1483d0bba6b2"),
    "trader": ObjectId("57b1ed6598b8be7cae69c365"),
    "assetId": "loan-123",
    "assetClass": "IL;EUR;A",
    "bookValue": 1500,
    "totalAssetBookValue": 1500,
    "bookDate": ISODate("2016-08-15"),
    "minPriceRate": 1.1345,
    "maxSharedAPR": 0.15,
    "dividable": true,
    "status": "blank",
    "expired": ISODate("2016-09-14"),
    "relativeFlows": [
      {"value": 0.120, "date": ISODate("2016-09-14")},
      {"value": 0.120, "date": ISODate("2016-10-14")},
      {"value": 0.120, "date": ISODate("2016-11-14")},
      {"value": 0.120, "date": ISODate("2016-12-14")},
      {"value": 0.120, "date": ISODate("2017-01-14")},
      {"value": 0.120, "date": ISODate("2017-02-14")},
      {"value": 0.120, "date": ISODate("2017-03-14")},
      {"value": 0.120, "date": ISODate("2017-04-14")},
      {"value": 0.120, "date": ISODate("2017-05-14")},
      {"value": 0.120, "date": ISODate("2017-06-14")},
      {"value": 0.120, "date": ISODate("2017-07-14")},
      {"value": 0.120, "date": ISODate("2017-08-14")}
    ]
  }
];
