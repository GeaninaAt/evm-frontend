'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });
}])

.controller('homeController', ["$scope", "$cookies", "LoginFactory", function($scope, $cookies, LoginFactory) {
    $scope.LogUser = function() {
        LoginFactory.LoginUser($scope.email, $scope.password)
    }
    $cookies.put('myFavorite', 'oatmeal');
    console.log($cookies.get('myFavorite'))
}]);