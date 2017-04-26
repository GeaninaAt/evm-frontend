'use strict';

angular.module('myApp.addOrganizer')

.factory("addOrganizerFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {

    //add Organizer http call
    var addOrganizer = function(locationData) {
        var url = "http://localhost:8080/organizers";
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
        addOrganizer: addOrganizer
    }
}])