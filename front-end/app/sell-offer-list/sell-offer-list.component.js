'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('sellOfferList').
  component('sellOffers', {
    templateUrl: 'sell-offer-list/sell-offer-list.template.html',
    controller: ['SellOffer',
      function SellOfferListController(SellOffer) {
        this.offers = SellOffer.query();
        this.orderProp = '-updated';
      }
    ]
  });
