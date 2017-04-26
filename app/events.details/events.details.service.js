'use strict';

angular.module('myApp.eventDetails')

.factory("eventDetailsFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {

    var credentials = {
        "username": "user",
        "password": "pass"
    }
    var config = {
        headers: {
            "Authorization": "Bearer " + $cookies.get("userToken")
        }
    }
    var getEventById = function(eventId) {
        var url = "http://localhost:8080/rest/events/" + eventId;
        return $http.get(url, config).then(
            function(response) {
                return response;
            },
            function(err) {
                console.log('we got and error ' + err);
            }
        )

    }

    return {
        getEventById: getEventById
    }


}])