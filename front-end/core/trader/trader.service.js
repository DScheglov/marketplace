'use strict';

angular.
  module('core.trader').
  factory('Trader', ['$resource',
    function($resource) {
      return $resource('api/v1/traders/:id', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
