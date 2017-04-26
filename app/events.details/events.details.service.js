'use strict';

angular.module('myApp.eventDetails')

.factory("eventDetailsFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {
    var config = {
        headers: {
            "Authorization": "Bearer " + $cookies.get("userToken")
        }
    }

    //get Events by id http call
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

    //add review http call
    var addReview = function(dataBody) {
        var url = "http://localhost:8080/rest/events/review";
        return $http.post(url, dataBody, config).then(function(responseSucces) {
            console.log(responseSucces);
            return responseSucces;
        }, function(responseError) {
            console.log(responseError);
        })
    }
    return {
        getEventById: getEventById,
        addReview: addReview
    }
}])