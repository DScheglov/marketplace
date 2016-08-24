'use strict';

angular.
  module('core.sellOffer').
  factory('SellOffer', ['$resource',
    function($resource) {
      return $resource('/api/v1/selloffers/:id', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
