'use strict';

angular.module('myApp.addLocation')

.factory("addLocationFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {


    /**
     * add Location http call
     */
    var addLocation = function(locationData) {
        var url = "http://localhost:8080/locations";

        //setting up Authorization headers
        var config = {
            headers: {
                "Authorization": "Bearer " + $cookies.get("userToken")
            }
        }
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