angular.module('starter.services', ['ionic', 'ngCordova'])
    .service('fileTransfer', ['$cordovaFileTransfer', function ($cordovaFileTransfer) {

        //------------------------

        this.uploadToNode = function () {
            var url = "http://192.168.1.28:3000/photo";
            //target path may be local or url
            var targetPath = "";
            var filename = targetPath.split("/").pop();
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "image/jpg"
            };
            $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
                console.log("SUCCESS: " + JSON.stringify(result.response));
                alert("success");
                alert(JSON.stringify(result.response));
            }, function (err) {
                console.log("ERROR: " + JSON.stringify(err));
                alert(JSON.stringify(err));
            });
        };
        //-------------------------
}]);