'use strict';

angular.module('myApp.adminDashboard', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin_Dashboard', {
        templateUrl: 'adminDashboard/adminDashboard.html',
        controller: 'adminDashboardController'
    });
}])

.controller('adminDashboardController', ["$scope", "$location", "$cookies", "adminDashboardFactory", function($scope, $location, $cookies, adminDashboardFactory) {

    /**
     * navigate to addmin pages
     * to add locations,events or 
     * organizers
     */

    $scope.goToLocations = function() {
        if ($cookies.get("userRole") == "ADMIN") {
            $location.path("/add_location");
        }
    }

    $scope.goToOrganizers = function() {
        if ($cookies.get("userRole") == "ADMIN") {
            $location.path("/add_organizer");
        }
    }

    $scope.goToEvents = function() {
        if ($cookies.get("userRole") == "ADMIN") {
            $location.path("/add_event");
        }
    }


}]);