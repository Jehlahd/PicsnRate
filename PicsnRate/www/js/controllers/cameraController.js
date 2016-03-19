angular.module('starter.controllers')
    .controller('CameraCtrl', function ($scope, $cordovaCamera, $http, API_URL, $cordovaGeolocation) {

        ionic.Platform.ready(function () {

            $scope.takePicture = function () {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;

                    var options = {
                        timeout: 10000,
                        enableHighAccuracy: true
                    };

                    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                        $http.post(API_URL + 'photo', {
                                photo: $scope.imgURI,
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                                votes: 0
                            }).success(function (user) {
                                console("picture send");
                            })
                            .error(function (err) {
                                console("error" + err);
                            });
                    });

                }, function (err) {
                    console.log(err);
                    $scope.error = err;
                    // An error occured. Show a message to the user
                });
            }
        });

    });