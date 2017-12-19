'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('ViewSaleCtrl', function ($scope, $http, $timeout, $route, $filter) {

        $http.get('/api/sales').then(function (resp) {
            console.log("sales", resp.data)

            $scope.sales = resp.data;

        });



    });
