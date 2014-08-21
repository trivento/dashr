'use strict';

/* Services */

var dashboardServices = angular.module('dashboardServices', ['ngResource']);

dashboardServices.factory('Dashboard', ['$resource',
    function($resource){
            return $resource('https://ci.jenkins-ci.org/view/All/api/json?pretty=true&depth=1', {}, {
                      query: {method:'GET', params:{}, isArray:false}
            });
    }
]);


