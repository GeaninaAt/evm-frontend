'use strict';

angular.module('myApp.addLocation', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/add_location', {
        templateUrl: 'addLocation/addLocation.html',
        controller: 'addLocationController'
    });
}])

.controller('addLocationController', ["$scope", "$location", "$cookies", "addLocationFactory", function($scope, $location, $cookies, addLocationFactory) {

    /**
     * setting variables to show
     * or hide success and error 
     * messages
     */
    $scope.addedLocation = false;
    $scope.invalidLocationForm = false;

    /**
     * Add location function
     * it also validate the form 
     * and change the error or success
     * messages value regarding to form
     */
    $scope.addLocation = function(locationName, district, street, number) {
        var dataLocationObject = {
            "locationName": locationName,
            "district": district,
            "street": street,
            "number": number
        };

        if ($scope.locationForm.$pristine || $scope.locationForm.$invalid) {
            $scope.invalidLocationForm = true;
            $scope.addedLocation = false;
        } else {
            addLocationFactory.addLocation(dataLocationObject).then(
                function(responseSuccess) {
                    $scope.addedLocation = true;
                    $scope.invalidLocationForm = false;
                },
                function(responseError) {
                    $scope.addedLocation = false;
                    $scope.invalidLocationForm = false;
                }
            );
        }
    }
}]);