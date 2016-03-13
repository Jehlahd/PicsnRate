angular.module('starter.controllers')
    .controller('IdleCtrl', function ($scope, $state, $http, $rootScope, API_URL) {
        $scope.$on("$ionicView.beforeEnter", function () {
            $http.get(API_URL + 'photo')
                .success(function (pictures) {
                    $scope.pictures = pictures;
                    console.log(pictures.pictures);
                })
                .error(function (err) {
                    alert("error" + err);
                });
        });
        $scope.locateOnMap = function (id) {
            $state.go("app.dashboard", {
                id: id
            });
        }
    });