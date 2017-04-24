'use strict';

angular.module("myApp")

.directive("navBarDirective", function() {
        return {
            templateUrl: "directives/navbarDirective/navBar.html",
            controller: "navBarController"
        };
    })
    .controller('navBarController', ["$scope", "$location", "$cookies", "$http", function($scope, $location, $cookies, $http) {
        if ($cookies.get('userRole') == 'ADMIN') {
            $scope.showAdminPannel = true
        } else {
            $scope.showAdminPannel = false;
        }

        $scope.goToAdminDashboard = function() {
            $location.path('/admin_Dashboard')
        }

    }]);