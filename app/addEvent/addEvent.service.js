'use strict';

angular.module('myApp.addEvent')

.factory("addEventFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {

    //get Locations http call
    var getLocations = function() {
        var url = 'http://localhost:8080/rest/locations';
        var config = {
            headers: {
                "Authorization": "Bearer " + $cookies.get("userToken")
            }
        }
        return $http.get(url, config).then(function(response) {
            return response.data;
        })
    }

    //get Organizers http call
    var getOrganizers = function() {
        var url = 'http://localhost:8080/rest/organizers';
        //we have to change this
        var config = {
            headers: {
                "Authorization": "Bearer " + $cookies.get("userToken")
            }
        }
        return $http.get(url, config).then(function(response) {
            //console.log(response);
            return response.data;

        })
    }

    //add Event http call
    var addEvent = function(eventData) {
        var url = 'http://localhost:8080/rest/events';
        console.log(eventData);
        //we have to change this
        var config = {
            headers: {
                "Authorization": "Bearer " + $cookies.get("userToken")
            }
        }
        return $http.post(url, eventData, config).then(
            function(response) {
                return response
            },
            function(err) {
                console.log(err);
            })
    }

    return {
        getLocations: getLocations,
        getOrganizers: getOrganizers,
        addEvent: addEvent

    }
}])