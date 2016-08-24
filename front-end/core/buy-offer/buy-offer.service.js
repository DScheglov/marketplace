'use strict';

angular.
  module('core.buyOffer').
  factory('BuyOffer', ['$resource',
    function($resource) {
      return $resource('api/v1/buyoffers/:id', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
