'use strict';

/* App Module */

var jenkinsStatus = angular.module('jenkinsStatus', [
  'ngRoute',
  'ui.bootstrap',
  'dashboardControllers',
  'dashboardServices',
  'jenkinsStatus.directive',
  'ngResource'
]);

jenkinsStatus.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
  }]);

angular.module('jenkinsStatus.directive', []);
