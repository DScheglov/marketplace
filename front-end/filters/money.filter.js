'use strict';

angular.
  module('core').
  filter('money', function() {
    return function(input) {
      return (parseInt(input, 10) / 100).toFixed(2);
    };
  });
