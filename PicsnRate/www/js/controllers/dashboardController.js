angular.module('starter.controllers')
    .controller('DashboardCtrl', function ($scope, $window, $stateParams, $http, $cordovaGeolocation, uiGmapGoogleMapApi, $stateParams, API_URL) {

        $scope.$on("$ionicView.afterEnter", function () {

            var centerOnMarkerId = function (id) {
                $scope.coords.forEach(function (coord) {
                    if (coord.id === id) {
                        $scope.map.center.latitude = coord.latitude;
                        $scope.map.center.longitude = coord.longitude;
                    }
                });
            }

            if ($stateParams.id === "{}") {
                $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                    $scope.map.center.latitude = position.coords.latitude;
                    $scope.map.center.longitude = position.coords.longitude;
                });
            }


            $http.get(API_URL + 'coords')
                .success(function (coords) {
                    $scope.coords = coords.latLng;
                    if ($stateParams.id !== undefined) {
                        centerOnMarkerId($stateParams.id);
                    }
                });

            $scope.map = {
                center: {
                    latitude: 43.312660199999996,
                    longitude: -75.5741683
                },
                zoom: 15
            };
            var options = {
                timeout: 10000,
                enableHighAccuracy: true
            };


            uiGmapGoogleMapApi.then(function (maps) {

            })

        });
    });