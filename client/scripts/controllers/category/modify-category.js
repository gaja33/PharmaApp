'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('ModifyCategoryCtrl', function ($scope, $http, $location, $timeout, $routeParams, getId, $uibModalInstance,$route) {

        $scope.Update = true;
        $scope.Add = false;

        $scope.headerName = "Update";

        $scope.category = {};
    
        $scope.showAlert = false;

        $scope.getId = getId;

        console.log("id", $scope.getId)

        /*var currentId = $routeParams.id;
        $http.get('/api/CategoryNames/' + currentId).then(function (resp) {
            console.log(resp)
            $scope.category = resp.data;
        })*/

        $http.get('/api/CategoryNames/' + $scope.getId).then(function (resp) {
            console.log(resp)
            $scope.category = resp.data;
        })


        $scope.categoryUpdate = function (obj) {
            console.log("obj", obj)
            $http.put('/api/CategoryNames', obj).then(function (resp) {
                if (resp.status == 200) {
                    
                    $scope.message = "Updated Succesfully";
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
            })
        }

        $scope.cancel = function () {
            $uibModalInstance.close();
        };



    });
