'use strict';

/* App Module */

var dashr = angular.module('dashr', [
  'ngRoute',
  'ui.bootstrap',
  'dashboardControllers',
  'dashboardServices',
  'dashboardFilters',
  'ngResource'
]);

dashr.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/jenkins', {
        templateUrl: 'partials/jenkins/index.html',
        controller: 'JobsCtrl'
      }).
      otherwise({
        redirectTo: '/jenkins'
      });
  }]);
