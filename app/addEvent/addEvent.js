'use strict';

angular.module('myApp.addEvent', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/add_event', {
        templateUrl: 'addEvent/addEvent.html',
        controller: 'addEventController'
    });
}])

.controller('addEventController', ["$scope", "$location", "$cookies", 'addEventFactory', function($scope, $location, $cookies, addEventFactory) {

    /**
     * rebuild an array based on locations and organizers response from server.
     * This is necessary beacuse when we add an event we select the 
     * name from dropdown but we have to sent location or organizer ID 
     * to the server
     */
    addEventFactory.getLocations().then(function(response) {
        $scope.locations = []
        for (var i in response) {
            $scope.locations.push({
                id: response[i].id,
                locationName: response[i].locationName
            })
        }

    });

    addEventFactory.getOrganizers().then(function(response) {
        $scope.organizers = [];
        for (var i in response) {
            $scope.organizers.push({
                id: response[i].id,
                organizerName: response[i].organizerName
            })
        }
        console.log($scope.organizers)
    });

    /**
     * add event functionality
     * it also checks that all fields of the 
     * form to be completed
     */
    $scope.addEvent = function(eventName, description, startDate, endDate, location, organizer, category, isFree) {

        $scope.addedEvent = false;
        $scope.invalidEventForm = false;
        var eventObject = {
            "eventName": eventName,
            "description": description,
            "organizerId": findId($scope.organizers, organizer),
            "locationId": findId($scope.locations, location),
            "startDate": startDate,
            "endDate": endDate,
            "category": category,
            "free": (isFree == 'true')
        }

        if ($scope.addEventForm.$pristine || $scope.addEventForm.$invalid) {
            $scope.invalidEventForm = true;
            $scope.addedEvent = false;
        } else {
            addEventFactory.addEvent(eventObject).then(
                function(responseSuccess) {
                    $scope.addedEvent = true;
                    $scope.invalidEventForm = false;
                },
                function(responseError) {
                    $scope.addedEvent = false;
                    $scope.invalidEventForm = false;
                }
            );
        }


    }


    /**
     * User the array crated at the begining of the controller
     * to iterate trough the names and take the id for the 
     * selected one, which can be pass to the server
     */
    function findId(obj, valueToFind) {
        var returnedIdForValue;
        for (var i in obj) {
            if (obj[i].locationName == valueToFind || obj[i].organizerName) {
                returnedIdForValue = obj[i].id;
            }
        }
        return returnedIdForValue;
    }

    /**
     * Different date formats
     * for the datepicker
     */
    $scope.formats = ['yyyy-MM-dd', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    /**
     * Initialize as false first time 
     * the datepicker open modeal
     */
    $scope.StartDateStatus = {
        opened: false
    };

    /**
     * Change datepicker status 
     * and open it
     */
    $scope.StartDate = function() {
        $scope.StartDateStatus.opened = true;
    };

    /**
     * Initialize datepicker
     * selected date with current
     * date
     */
    $scope.today = function() {
        $scope.dtStart = new Date();
        $scope.dtEnd = new Date();
    };
    $scope.today();

    /**
     * Options for datepicker
     */
    $scope.dateOptionsStartDate = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    /**
     * Disabled days on datepicker
     */
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }


    $scope.EndDate = function() {
        $scope.EndDateStatus.opened = true;
    };



    $scope.EndDateStatus = {
        opened: false
    };

    /**
     * Options for datepicker
     */
    $scope.dateOptionsEndDate = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };





}]);