'use strict';

angular.module('myApp.register', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'registerController'
    });
}])

.controller('registerController', ["$scope", "$cookies", "registerFactory", function($scope, $cookies, registerFactory) {

    /**
     * register a user
     */


    $scope.addedUser = false;
    $scope.invalidUserForm = false;
    $scope.registerUser = function(firstName, lastName, userName, email, password, confirmPassword) {
        var dataBody = {
            "firstName": firstName,
            "lastName": lastName,
            "username": userName,
            "email": email,
            "password": password,
            "matchPassword": confirmPassword
        }
        if ($scope.registerForm.$pristine || $scope.registerForm.$invalid) {
            $scope.invalidRegisterForm = true;
            $scope.addedUser = false;
        } else {
            registerFactory.registerUser(dataBody).then(function(response) {
                // console.log(response);
                $scope.addedUser = true;
                $scope.invalidLocationForm = false;
            })

        }
    }

}]);