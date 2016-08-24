'use strict';

angular.
  module('bslMarketplaceApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/sell-offers', {
          template: '<sell-offers></sell-offers>'
        }).
        when('/sell-offers/:id', {
          template: '<sell-offer-detail></sell-offer-detail>'
        }).
        otherwise('/sell-offers');
    }
  ]);
