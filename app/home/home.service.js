'use strict';

angular.module('myApp.home')

.factory("LoginFactory", ["$http", function($http) {

    var LoginUser = function(username, password) {
        console.log(username + " " + password);
    }

    return {
        LoginUser: LoginUser
    }
}])