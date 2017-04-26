'use strict';

angular.module("myApp")

.directive("navBarDirective", function() {
        return {
            templateUrl: "directives/navbarDirective/navBar.html",
            controller: "navBarController"
        };
    })
    .controller('navBarController', ["$scope", "$location", "$cookies", "$http", function($scope, $location, $cookies, $http) {

        /**
         * displaying the admin showAdminPannel
         * regarding to user role
         */
        if ($cookies.get('userRole') == 'ADMIN') {
            $scope.showAdminPannel = true
        } else {
            $scope.showAdminPannel = false;
        }

        /**
         * navigate to admin admin Dashboard
         */
        $scope.goToAdminDashboard = function() {
            $location.path('/admin_Dashboard')
        }

        $scope.logOut = function() {
            $cookies.remove('userLogged');
            $cookies.remove('userToken');
            $cookies.remove('userRole');
            $cookies.remove('userName');
            $location.path('/login')
        }

    }]);