'use strict';

angular.module('myApp.login')

.factory("LoginFactory", ["$rootScope", "$http", "$cookies", function($rootScope, $http, $cookies) {

    var authenticateUser = function(credentials) {


        var headers = credentials ? {
            authorization: "Basic " + btoa(credentials.username + ":" + credentials.password)
        } : {};

        $http.get('http://localhost:8090/rest/users', {
            headers: headers
        }).then(function(response) {
            if (response.data.name) {
                $cookies.put('userLogged', true);
                $rootScope.loginValidation = false;
                console.log("logat");
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