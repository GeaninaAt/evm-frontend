'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });
}])

.controller('homeController', ["$scope", "$location", "$cookies", 'HomeFactory', function($scope, $location, $cookies, HomeFactory) {


    HomeFactory.getEvents().then(function(response) {
        $scope.existingEvents = response.data;
    });

}]);