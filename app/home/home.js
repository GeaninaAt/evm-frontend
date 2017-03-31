'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });

}])

.controller('homeController', ["$scope", "$location", "$cookies", function($scope, $location, $cookies) {
    var pyrmont = { lat: 44.439663, lng: 26.096306 };
    $scope.parkingZones = [];
    $scope.markers = [];
    var mapOptions = {
        zoom: 15,
        center: pyrmont,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.locationsShow = [];

    $scope.infoWindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService($scope.map);
    service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['parking']
    }, callback);

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                $scope.locationsShow.push(results[i]);
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: place.geometry.location,
        });
        marker.content = '<div class="infoWindowContent">' + place.vicinity + ' E,' + ' N, </div>';

        google.maps.event.addListener(marker, 'click', function() {
            $scope.infoWindow.setContent('<h4>' + place.name + '</h4>' +
                marker.content);
            $scope.infoWindow.open($scope.map, marker);
        });
        // $scope.markers.push(marker);
        /* google.maps.event.addListener(marker, 'click', function() {
             $scope.infowindow.setContent(place.name);
             $scope.infowindow.open($scope.map, this);
         });*/
    }

    /* for (var i = 0; i < $scope.locationsShow.length; i++) {
         createMarker($scope.locationsShow[i]);
     }*/

}]);