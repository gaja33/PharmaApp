'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ViewPurchaseCtrl', function ($scope, $http, $route) {
		$http.get('/api/purchases').then(function (resp) {
			console.log("resp", resp)
			$scope.purchases = resp.data;
		})
	
	
		$scope.deletePurchase = function (item) {
            console.log("item", item);
            $http.delete('api/purchases/' + item).then(function (res) {
                console.log("res", res);
				$route.reload();
            })
        };
	
	});
