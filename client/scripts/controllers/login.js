'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('LoginCtrl', function ($scope, $state, authService, $location,$rootScope) {
        $scope.showLoding = false;
        $scope.login = function () {
            $scope.showLoding = true;
            authService.login(this.email, this.password).then(function (response) {
                $location.path('/');
                console.log(response);
                $scope.showLoding = false;
                //$rootScope.username = response.user.username;
            }, function (err) {
                //alert(err.data.error.message);
                console.log(err);
                $scope.alertMsg= err.data.error.message;
                $scope.showLoding = false;
            });
        };
    });
