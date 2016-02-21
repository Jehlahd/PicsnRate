angular.module('starter.controllers')
    .controller('DashboardCtrl', function ($scope, $window, $stateParams, $http, $cordovaGeolocation, uiGmapGoogleMapApi, API_URL) {

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 15
        };
        var options = {
            timeout: 10000,
            enableHighAccuracy: true
        };
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;
            console.log(position);
        });

        uiGmapGoogleMapApi.then(function (maps) {

            $scope.circle = {
                radius: (10 * 1000),
                stroke: {
                    color: '#4285F4',
                    weight: 2,
                    opacity: 0.6
                },
                fill: {
                    color: '#4285F4',
                    opacity: 0.3
                }
            };
        })
    });