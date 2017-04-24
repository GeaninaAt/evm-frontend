'use strict';

angular.module('myApp.addLocation')

.factory("addLocationFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {


    var addLocation = function(locationData) {
        var url = "http://localhost:8080/locations";
        var config = {
            headers: {
                "Authorization": "Bearer " + $cookies.get("userToken")
            }
        }
        console.log(config);
        return $http.post(url, locationData, config).then(function(response) {
            return response;

        }, function(err) {
            console.log(err);
        });
    }

    return {
        addLocation: addLocation
    }
}])