'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });
}])

.controller('homeController', ["$scope", "$location", "$cookies", "$http", 'HomeFactory', function($scope, $location, $cookies, $http, HomeFactory) {

    /**
     * get curent created Events
     */
    var pageNumber;
    HomeFactory.getEvents(pageNumber).then(function(response, pageUrl) {
        $scope.existingEvents = response.data.content;
        console.log($scope.existingEvents);

        //get total pages
        $scope.totalPages = response.data.page.totalPages;
        $scope.currentPage = response.data.page.number;

        //build the pagination tabs regarding  total pages;
        $scope.pagesTabs = new Array();
        for (var i = 0; i < $scope.totalPages; i++) {
            $scope.pagesTabs.push(i);
        }

    });

    /**
     * go to event details page
     */
    $scope.takeEventDetails = function(eventId) {
        var result = /[^/]*$/.exec(eventId)[0];
        console.log(result);
        $location.path('/event_details').search({ eventId: result });
    }




    /**
     * PAGINATION FUNCTIONALITY
     */
    $scope.changePage = function(pageNumber) {
        HomeFactory.getEvents(pageNumber).then(function(response, pageUrl) {
            $scope.existingEvents = response.data.content;
        });
    }

    $scope.changePageDesc = function() {
        if ($scope.currentPage - 1 >= 0) {
            $scope.currentPage -= 1;
            HomeFactory.getEvents($scope.currentPage).then(function(response, pageUrl) {
                $scope.existingEvents = response.data.content;
            });
        }
    }
    $scope.changePageAsc = function() {
        if ($scope.currentPage + 1 < $scope.totalPages) {
            $scope.currentPage += 1;
            HomeFactory.getEvents($scope.currentPage).then(function(response, pageUrl) {
                $scope.existingEvents = response.data.content;
            });
        }
    }


}]);