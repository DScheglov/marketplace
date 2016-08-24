'use strict';

angular.
  module('core.commitment').
  factory('Commitment', ['$resource',
    function($resource) {
      return $resource('api/v1/commitments/:id', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
