angular.module('starter.controllers', ['uiGmapgoogle-maps', 'ngCordova'])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $auth, $window, $state, $ionicViewService) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});


        //Check login or logout

        var storage = $window.localStorage;
        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        $scope.logout = function () {
            storage.removeItem("userId");
            storage.removeItem("userName");
            $auth.logout();
            $ionicViewService.nextViewOptions({
                disableBack: true
            });

            $state.go("app.idle");
        };

        // Form data for the login modal
        $scope.loginData = {};
        $scope.registerData = {};



        //------------------------Login--------------------------
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            id: 1,
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            $auth.login({
                    email: $scope.loginData.email,
                    password: $scope.loginData.password
                })
                .then(function (res) {
                    var message = 'Thanks for coming back ' + res.data.user.email + '!';

                    $scope.userId = res.data.user._id;
                    storage.setItem("userId", res.data.user._id);
                    storage.setItem("userName", res.data.user.displayName);
                    $scope.modal.hide();
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        //------------------------REGISTER--------------------------

        $ionicModal.fromTemplateUrl('templates/register.html', {
            id: 2,
            scope: $scope
        }).then(function (modal) {
            $scope.registerModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeRegister = function () {
            $scope.registerModal.hide();
        };

        // Open the login modal
        $scope.register = function () {
            $scope.registerModal.show();
            $scope.modal.hide();
        };

        // Perform the login action when the user submits the login form
        $scope.doRegister = function () {
            console.log($scope.registerData.email + " + " + $scope.registerData.password + $scope.registerData.username);
            $auth.signup({
                    firstName: $scope.registerData.username,
                    email: $scope.registerData.email,
                    password: $scope.registerData.password
                })
                .then(function (res) {
                    console.log("Register ok");
                    $scope.registerModal.hide();
                }).catch(function (err) {
                    console.log(err);
                });
        };
    })
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({

            v: '3.18',
            libraries: 'geometry,visualization'
        });
    })