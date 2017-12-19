'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ViewMedicineCtrl', function ($scope, $http, $route) {
		$http.get('/api/medicines').then(function (resp) {
			console.log("resp", resp)
			$scope.medicines = resp.data;
		})
	
	
		$scope.deleteMedicine = function (item) {
            console.log("item", item);
            $http.delete('api/medicines/' + item).then(function (res) {
                console.log("res", res);
				$route.reload();
            })
        };
	
	});
