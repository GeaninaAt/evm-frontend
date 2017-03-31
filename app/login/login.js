'use strict';

angular.module('myApp.login', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginController'
    });
}])

.controller('loginController', ["$scope", "$location", "$cookies", "LoginFactory", function($scope, $location, $cookies, LoginFactory) {
    /**
     * Log the user in application
     */
    $scope.LoginUser = function(userName, password) {
        var credentials = {
            username: userName,
            password: password
        }
        LoginFactory.authenticateUser(credentials);
    }
    var favoriteCookie = $cookies.get('userLogged');
    console.log(favoriteCookie);
    /**
     * go to register page
     */
    $scope.goToRegister = function() {
        $location.path('/register')
    }


}]);