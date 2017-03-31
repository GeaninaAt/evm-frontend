'use strict';

angular.module('myApp.login')

.factory("LoginFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {

    var authenticateUser = function(credentials) {


        var headers = credentials ? {
            authorization: "Basic " + btoa(credentials.username + ":" + credentials.password)
        } : {};

        $http.get('http://localhost:8090/rest/users', {
            headers: headers
        }).then(function(response) {
            if (response.data.name) {
                $cookies.put('userLogged', true);
                $cookies.put('userName', credentials.username)
                $rootScope.loginValidation = false;
                console.log("logat");
                $location.path('/home');
            } else {
                $cookies.put('userLogged', false);
            }
            // callback && callback($rootScope.authenticated);
        }, function(response) {
            console.log(response)
            $rootScope.loginValidation = true;
            //   $rootScope.authenticated = false;
            //callback && callback(false);
        });
    };

    return {
        authenticateUser: authenticateUser
    }
}])