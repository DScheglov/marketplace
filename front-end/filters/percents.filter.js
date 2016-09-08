'use strict';

angular.
  module('core').
  filter('percents', function() {
    return function(input) {
      return (Math.round(input * 1e4) / 100).toFixed(2) + '%';
    };
  });
