'use strict';

angular.module('myApp.login')

.factory("LoginFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {

    var authenticateUser = function(credentials) {

        /**
         * Authenticate user and obtain the access token which is stored
         * in the cookies with other details for user(username and role)
         */
        return $http.post('http://localhost:8080/authenticate?username=' + credentials.username + '&password=' + credentials.password).then(function(response) {
                //console.log(response);
                if (response.data.token) {
                    console.log(response);
                    $cookies.put('userLogged', true);
                    $cookies.put('userToken', response.data.token);
                    $cookies.put('userRole', response.data.user.roles[0]);
                    $cookies.put('userName', response.data.user.username);
                    $rootScope.loginValidation = false;
                    console.log($cookies.get('userRole'));
                    $location.path('/home');
                } else {
                    $cookies.put('userLogged', false);
                }
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                return response.data.token;
                // callback && callback($rootScope.authenticated);
            },
            function(response) {
                // console.log(response)
                $rootScope.loginValidation = true;
                //   $rootScope.authenticated = false;
                //callback && callback(false);
            });

    };


    return {
        authenticateUser: authenticateUser
    }
}])