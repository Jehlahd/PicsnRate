angular.module('starter.controllers')
    .controller('CameraCtrl', function ($scope, $cordovaCamera, $http, API_URL) {
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            // as soon as this function is called FileTransfer "should" be defined
            console.log(FileTransfer);
        }

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
                    $http.post(API_URL + 'photo', {
                            picture: $scope.imgURI
                        }).then(function (user) {
                            alert("picture send");
                        })
                        .error(function (err) {
                            alert("error" + err);
                        });

                }, function (err) {
                    console.log(err);
                    $scope.error = err;
                    // An error occured. Show a message to the user
                });
            }

            $scope.testFileUpload = function () {
                // Destination URL 
                var url = "http://192.168.1.28:3000/photo";

                //File for Upload
                var targetPath = "";

                // File name only
                var filename = targetPath.split("/").pop();

                var options = {
                    fileKey: "file",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "image/jpg",
                    params: {
                        'directory': 'upload',
                        'fileName': filename
                    }
                };

                $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
                    console.log("SUCCESS: " + JSON.stringify(result.response));
                }, function (err) {
                    console.log("ERROR: " + JSON.stringify(err));
                }, function (progress) {
                    // PROGRESS HANDLING GOES HERE
                });
            }
        });

    });