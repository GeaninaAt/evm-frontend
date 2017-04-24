'use strict';

angular.module('myApp.adminDashboard', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin_Dashboard', {
        templateUrl: 'adminDashboard/adminDashboard.html',
        controller: 'adminDashboardController'
    });
}])

.controller('adminDashboardController', ["$scope", "$location", "$cookies", "adminDashboardFactory", function($scope, $location, $cookies, adminDashboardFactory) {

    $scope.goToLocations = function() {
        $location.path("/add_location");
    }
    $scope.goToOrganizers = function() {
        $location.path("/add_organizer");
    }
    $scope.goToEvents = function() {
        $location.path("/add_event");
    }


}]);