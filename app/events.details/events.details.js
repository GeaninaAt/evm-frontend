'use strict';

angular.module('myApp.eventDetails', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/event_details', {
        templateUrl: 'events.details/events.details.html',
        controller: 'eventDetailsController'
    });
}])

.controller('eventDetailsController', ["$scope", "$location", "$cookies", 'eventDetailsFactory', "$uibModal", function($scope, $location, $cookies, eventDetailsFactory, $uibModal) {
    var eventId = $location.search().eventId;

    eventDetailsFactory.getEventById(eventId).then(function(response) {
        $scope.curentEventDetails = response.data;
    })

    $scope.openRateModal = function() {

        $scope.opts = {
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: '../events.details/rateEvent.html',
            controller: ModalInstanceCtrl,
            resolve: {} // empty storage
        };

        $scope.opts.resolve.item = function() {
            return angular.copy({ name: $scope.name }); // pass name to Dialog
        }

        var modalInstance = $uibModal.open($scope.opts);

        modalInstance.result.then(function() {
            //on ok button press 
        }, function() {
            //on cancel button press
            console.log("Modal Closed");
        });
    };
    var ModalInstanceCtrl = function($scope, $uibModalInstance, $uibModal, item) {

        $scope.item = item;

        $scope.ok = function() {
            $uibModalInstance.close();
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }



}]);