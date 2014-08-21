'use strict';

/* App Module */

var dashr = angular.module('dashr', [
  'ngRoute',
  'ui.bootstrap',
  'dashboardControllers',
  'dashboardServices',
  'dashr.directive',
  'ngResource'
]);

dashr.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'JobsCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
  }]);

angular.module('dashr.directive', []);
