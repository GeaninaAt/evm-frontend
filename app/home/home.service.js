'use strict';

angular.module('myApp.login')

.factory("HomeFactory", ["$rootScope", "$http", "$cookies", "$location", function($rootScope, $http, $cookies, $location) {
    var config = {
        headers: {
            'Authorization': 'Bearer' + ' ' + $cookies.get('userToken'),
            'Accept': 'application/x-spring-data-verbose+json'
        }
    }

    //get events http call paginated
    var getEvents = function(pageNumber) {
        var urlRequest;
        if (pageNumber == null) {
            urlRequest = "http://localhost:8080/events?page=0&size=9";
        } else {
            urlRequest = "http://localhost:8080/events?page=" + pageNumber + "&size=9";
        }
        return $http.get(urlRequest, config).then(
            function(response) {
                // console.log("-------------");
                //console.log(response);
                return response;
            },
            function(err) {
                console.log('we got and error ' + err);
            }
        )

    }

    return {
        getEvents: getEvents
    }
}])