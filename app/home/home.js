'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });

}])

.controller('homeController', ["$scope", "$location", "$cookies", "$http", function($scope, $location, $cookies, $http) {
    // var pyrmont = { lat: 44.439663, lng: 26.096306 };
    //  $scope.parkingZones = [];

    $scope.markers = [];

    $scope.radius = 500;
    $scope.changeSearchArea = function(radius) {
            // console.log(radius)
            $scope.radius = radius;
            $scope.drow();
        }
        /**
         * Get curent location with geolocation goolgle service 
         * and also the parking places via google api service and
         * drow them in the same map
         */

    $scope.drow = function() {
        if (navigator.geolocation) {
            /**
             * Get current location
             */
            navigator.geolocation.getCurrentPosition(function(p) {
                var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                $scope.userPos = {
                    latitude: p.coords.latitude,
                    longitude: p.coords.longitude
                };
                var mapOptions = {
                    center: LatLng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                //create map based on current location
                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                var pyrmont = { lat: p.coords.latitude, lng: p.coords.longitude };
                //pass the map to service to mark parking places
                var service = new google.maps.places.PlacesService($scope.map);
                service.nearbySearch({
                    location: pyrmont,
                    radius: $scope.radius,
                    type: ['parking']
                }, callback);

                //marker for user position on map
                var marker = new google.maps.Marker({
                    position: LatLng,
                    map: $scope.map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
                });

                //add click action on marker
                $scope.infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, "click", function(e) {
                    $scope.infoWindow.setContent(marker.title);
                    $scope.infoWindow.open(map, marker);
                });
            });

        }
    }

    /**
     * Create marker for each parking place find by the service
     * and create a marker for each place
     */
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                // $scope.locationsShow.push(results[i]);
                createMarker(results[i]);
            }
        }
    }

    /**
     * create marker for function
     * called to mark parking places 
     * on map
     */
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: place.geometry.location,
        });
        marker.content = '<div class="infoWindowContent">' + place.vicinity + '</div>';

        //add click actions for each marker
        google.maps.event.addListener(marker, 'click', function() {
            $scope.infoWindow.setContent('<h4>' + place.name + '</h4>' +
                marker.content);
            $scope.infoWindow.open($scope.map, marker);

            var parkingPlace = {
                    latitude: this.position.lat(),
                    longitude: this.position.lng()
                }
                // console.log($scope.userPos);
            $scope.calcRoute(parkingPlace);
        });
    }

    $scope.calcRoute = function(startLatLong, endLatLong) {
        var start = new google.maps.LatLng(startLatLong.latitude, startLatLong.longitude);
        var end = new google.maps.LatLng($scope.userPos.latitude, $scope.userPos.longitude);
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap($scope.map);
            } else {
                alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
            }
        }, function(response, status) {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === 'OK') {
                document.getElementById('warnings-panel').innerHTML =
                    '<b>' + response.routes[0].warnings + '</b>';
                directionsDisplay.setDirections(response);
                showSteps(response, markerArray, stepDisplay, map);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    $scope.drow();
}]);