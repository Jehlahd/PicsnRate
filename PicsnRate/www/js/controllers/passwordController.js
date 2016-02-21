angular.module('starter.controllers')
    .controller('PasswordCtrl', function ($scope, $window, $stateParams, $ionicHistory, $http) {

        var storage = $window.localStorage;
        $scope.username = storage.getItem('userName');
        $scope.userId = storage.getItem('userId');

        $scope.submit = function () {
            var tmp = {
                pwd: this.currentPwd,
                newPwd: this.password
            };

        }
    });