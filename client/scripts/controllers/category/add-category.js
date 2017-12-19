'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('AddCategoryCtrl', function ($scope, $rootScope, $http, $location, $timeout, $routeParams, $uibModalInstance, $route) {

        $scope.Update = false;
        $scope.Add = true;

        $scope.headerName = "Add";

        $scope.category = {};

        $scope.showAlert = false;

        $scope.categorySave = function (obj) {
            console.log("obj", obj)
            $http.post('/api/CategoryNames', obj).then(function (resp) {
                console.log("resp", resp)
                if (resp.status == 200) {
                    console.log("Saved Succesfully")

                    $scope.message = "Saved Succesfully";
                    $scope.showAlert = true;

                    $scope.category = {};
                    $scope.Category.$setPristine();
                    $scope.Category.$setUntouched();

                    /*$timeout(function () {
                        $location.path('/view-category')
                    }, 500)*/

                    $timeout(function () {
                        $scope.showAlert = false;
                    }, 1000)

                    $timeout(function () {
                        $scope.cancel();
                        $route.reload();
                    }, 1500)

                }
            }, function errorCallback(response) {
                console.log("resp", response)
            })
        }

        $scope.cancel = function () {
            $uibModalInstance.close();
        };


    });
