angular.module('starter.controllers')
    .controller('ContactCtrl', function ($scope, $window, $stateParams, $http, $cordovaContacts, $cordovaSms, $ionicLoading, API_URL) {

        $scope.$on('$ionicView.beforeEnter', function () {

            if ($scope.contacts == undefined) {
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><p>Chargement des contacts...</p>'
                });
                $scope.getAllContacts();
            }
        });

        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: '' // send SMS with the native android SMS messaging
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

        $scope.filterSecId = function (items) {
            var result = {};
            angular.forEach(items, function (value, key) {
                if (value.phoneNumbers[0] !== undefined) {
                    result[key] = value;
                }
            });
            return result;
        }

        $scope.getAllContacts = function () {
            $cordovaContacts.find({}).then(function (allContacts) { //omitting parameter to .find() causes all contacts to be returned
                $scope.contacts = allContacts;
                $ionicLoading.hide();
            }, function (err) {

                alert("error" + err);
                // An error occured. Show a message to the user
            })
        };

    });