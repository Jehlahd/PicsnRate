angular.module('starter.controllers')
    .controller('ContactCtrl', function ($scope, $window, $stateParams, $http, $cordovaContacts, $cordovaSms, $ionicLoading, API_URL, $ionicPlatform) {

        $ionicPlatform.ready(function () {
            /*$scope.getAllContacts = function () {
                var options = {};
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><p>Chargement des contacts...</p>'
                });
                $cordovaContacts.find().then(function (allContacts) { //omitting parameter to .find() causes all contacts to be returned
                    $scope.contacts = allContacts;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    alert("error" + err);
                    // An error occured. Show a message to the user
                })
            };
            if ($scope.contacts == undefined) {
                $scope.getAllContacts();
            }*/
        });

        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT' // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                    //intent: 'INTENT' // send SMS inside a default SMS app
            }
        };

        $scope.sendSMS = function (number) {

            if (number !== undefined) {
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><p>Envoie du SMS...</p>'
                });
                $cordovaSms
                    .send(number, "Viens noter ma photo sur PicsnRate", options)
                    .then(function () {
                        $ionicLoading.hide();
                    }, function (error) {
                        // An error occurred
                    });
            }
        }

        $scope.sendSms = function () {

            $cordovaSms
                .send("", "Viens noter ma photo sur PicsnRate", options)
                .then(function () {
                    $ionicLoading.hide();
                }, function (error) {
                    // An error occurred
                });
        }
    });