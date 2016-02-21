angular.module('starter.controllers')
    .controller('ContactCtrl', function ($scope, $window, $stateParams, $http, $cordovaContacts, API_URL) {

        $scope.getAllContacts = function () {
            $cordovaContacts.find({}).then(function (allContacts) { //omitting parameter to .find() causes all contacts to be returned
                $scope.contacts = allContacts;
                console.log("jouge");
                console.log($scope.contacts);
            })
        };
    });