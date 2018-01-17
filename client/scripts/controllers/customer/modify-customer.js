'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('siddhiSaiMedApp')
    .controller('ModifyCustomerCtrl', function ($scope, $http, $location, $timeout, $routeParams, getId, $uibModalInstance, $route) {

        $scope.Update = true;
        $scope.Add = false;

        $scope.headerName = "Update";

        $scope.customer = {};

        $scope.showAlert = false;

        /*var currentId = $routeParams.id;*/
        $scope.getId = getId;

        $http.get('/api/customers/' + $scope.getId).then(function (resp) {
            console.log(resp)
            $scope.customer = resp.data;
        })


        $scope.customerUpdate = function (obj) {
            console.log("obj", obj)
            $http.put('/api/customers', obj).then(function (resp) {
                if (resp.status == 200) {

                    $scope.message = "Updated Succesfully";
                    $scope.showAlert = true;

                    $scope.customer = {};
                    $scope.Customer.$setPristine();
                    $scope.Customer.$setUntouched();

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
