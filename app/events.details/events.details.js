'use strict';

angular.module('myApp.eventDetails', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/eventDetails', {
        templateUrl: 'events.details/events.details.html',
        controller: 'eventDetailsController'
    });
}])

.controller('eventDetailsController', ["$scope", "$location", "$cookies", 'eventDetailsFactory', function($scope, $location, $cookies, eventDetailsFactory) {


}]);