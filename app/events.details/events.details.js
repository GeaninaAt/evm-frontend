'use strict';

angular.module('myApp.eventDetails', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/event_details', {
        templateUrl: 'events.details/events.details.html',
        controller: 'eventDetailsController'
    });
}])

.controller('eventDetailsController', ["$scope", "$location", "$cookies", 'eventDetailsFactory', "$uibModal", "modalFactory", function($scope, $location, $cookies, eventDetailsFactory, $uibModal, modalFactory) {

    /**
     * get current eventId
     * from url
     */
    var eventId = $location.search().eventId;

    /**
     * get curent event based
     * on url id param
     */
    eventDetailsFactory.getEventById(eventId).then(function(response) {
        $scope.curentEventDetails = response.data;
    })


    /**
     * open addReview Modal
     * and the confirmation success modal
     */
    $scope.openReviewModal = function() {
        var modal = modalFactory.openModal("../events.details/rateEvent.html", ModalInstanceCtrl, $scope);
        modal.result.then(function() {
            //on submitreview button press 
            console.log("Dismiss modal");
            var reviewSuccess = modalFactory.openModal("../modalService/modalSuccess.html", ModalInstanceCtrl, $scope);
            reviewSuccess.result.then(function() {
                //do some functionaliti for success modal if will need;
            }, function() {
                console.log("canceling seccond modal");
            });
        }, function() {
            //on cancel modal
        });
    };




    /**
     * Controller for review modal
     * cancel function from this modal
     * is also used for second modal wich
     * confirm success review added
     */
    var ModalInstanceCtrl = function($scope, $uibModalInstance, $uibModal, $http, eventDetailsFactory) {

        $scope.submitReview = function() {
            var dataBody = {
                eventId: $location.search().eventId,
                userName: $cookies.get('userName'),
                text: $scope.reviewBody
            }
            if ($scope.reviewBody == undefined || $scope.reviewBody.length == 0) {
                $scope.emptyContent = true;
                return false;
            } else {
                $scope.emptyContent = false;
            }

            eventDetailsFactory.addReview(dataBody).then(function(responseSuccess) {
                $uibModalInstance.close();
            }, function(responseErr) {
                console.log(responseErr);
            });
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }

}]);