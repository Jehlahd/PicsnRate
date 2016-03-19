angular.module('starter.controllers')
    .controller('IdleCtrl', function ($scope, $state, $http, $rootScope, API_URL) {
        $scope.$on("$ionicView.afterEnter", function () {
            $http.get(API_URL + 'photo')
                .success(function (pictures) {
                    $scope.pictures = pictures;
                })
                .error(function (err) {
                    console.log("error" + err);
                });
        });

        $scope.disabled = [];
        $scope.locateOnMap = function (id) {
            $state.go("app.dashboard", {
                id: id
            });
        }

        $scope.upvote = function (id) {
            $http.put(API_URL + 'photo/votes', {
                    id: id
                })
                .success(function (pictures) {
                    $scope.pictures.pictures.forEach(function (p) {
                        if (id == p._id) {
                            ++p.votes;
                            $scope.disabled.push(id);
                        }
                    })
                })
                .error(function (err) {
                    console.log("error" + err);
                });
        }
    });