angular.module('starter.controllers')
    .controller('ContactCtrl', function ($scope, $window, $stateParams, $http, $cordovaContacts, $cordovaSms, API_URL) {

        $scope.$on('$ionicView.beforeEnter', function () {
            // $scope.getAllContacts();
            $scope.suc = undefined;
        });


        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: '' // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                    //intent: 'INTENT' // send SMS inside a default SMS app
            }
        };

        $scope.sendSMS = function () {
            $scope.test = true;

            $cordovaSms
                .send('0633089022', 'This is some dummy text', options)
                .then(function () {
                    $scope.suc = true;
                }, function (error) {
                    $scope.err = true;
                    $scope.er = error;
                    // An error occurred
                });
        }



        $scope.getAllContacts = function () {

            $cordovaContacts.find({}).then(function (allContacts) { //omitting parameter to .find() causes all contacts to be returned
                $scope.contacts = allContacts;
                console.log($scope.contacts);
            }, function (err) {
                console.log(err);
                $scope.error = err;
                // An error occured. Show a message to the user
            })
        };

    });