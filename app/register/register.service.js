'use strict';

angular.module('myApp.register')

.factory("registerFactory", ["$http", function($http) {
    var registerUser = function(bodyData) {
        var url = "http://localhost:8090/rest/users/registration"

        return $http.post(url, bodyData).then(function(response) {
            console.log(response);
            return response.data;
        });
    }

    return {
        registerUser: registerUser
    }


}])