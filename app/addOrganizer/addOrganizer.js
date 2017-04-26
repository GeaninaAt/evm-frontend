'use strict';

angular.module('myApp.addOrganizer', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/add_organizer', {
        templateUrl: 'addOrganizer/addOrganizer.html',
        controller: 'addOrganizerController'
    });
}])

.controller('addOrganizerController', ["$scope", "$location", "$cookies", "addOrganizerFactory", function($scope, $location, $cookies, addOrganizerFactory) {

    /**
     * setting variables to show
     * or hide success and error 
     * messages
     */
    $scope.addedOrganizer = false;
    $scope.invalidOrganizerForm = false;


    /**
     * Add organizer function
     * it also validate the form 
     * and change the error or success
     * messages value regarding to form
     */
    $scope.addOrganizer = function(organizerName, description, site) {
        var dataLocationObject = {
            "organizerName": organizerName,
            "description": description,
            "site": site
        };

        if ($scope.organizerForm.$pristine || $scope.organizerForm.$invalid) {
            $scope.invalidOrganizerForm = true;
            $scope.addedOrganizer = false;
        } else {
            addOrganizerFactory.addOrganizer(dataLocationObject).then(
                function(responseSuccess) {
                    $scope.addedOrganizer = true;
                    $scope.invalidOrganizerForm = false;
                },
                function(responseError) {
                    $scope.addedOrganizer = false;
                    $scope.invalidOrganizerForm = false;
                }
            );
        }
    }
}]);