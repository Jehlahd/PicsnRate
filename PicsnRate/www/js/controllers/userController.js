angular.module('starter.controllers')
    .controller('UserCtrl', function ($scope, $window, $stateParams, $http, API_URL) {
        var storage = $window.localStorage;

        $scope.username = storage.getItem('userName');
        $scope.userId = storage.getItem('userId');

        $scope.userValues = {
            km: 20,
            userName: "",
            email: ""
        }

        $http.get(API_URL + "user", {
                params: {
                    user_id: $scope.userId
                }
            })
            .success(function (user) {
                $scope.userValues.km = user.km;
                $scope.email = user.email;
            })
            .error(function (err) {
                console.log(err.message);
            });


        $scope.updateUser = function () {
            $http.put(API_URL + "user", {
                user_id: $scope.userId,
                updatedUser: $scope.userValues
            }).success(function (res) {
                if ($scope.userValues.userName != "") {
                    storage.setItem("userName", $scope.userValues.userName);
                    $scope.username = $scope.userValues.userName;
                }
                if ($scope.userValues.email != "") {
                    $scope.email = $scope.userValues.email;
                }
                $scope.userValues.userName = "";
                $scope.userValues.email = "";
            })

        }

    });