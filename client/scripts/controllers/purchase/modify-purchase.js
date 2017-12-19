'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ModifyPurchaseCtrl', function ($scope, $http, $location, $timeout, $routeParams) {

			$scope.Update = true;
			$scope.Add = false;
		
		$scope.medicine = {};
	
		$http.get('/api/suppliers').then(function (resp) {
			console.log("resp", resp)
			$scope.supplierNames = resp.data;
		})
		
		var currentId = $routeParams.id;
			$http.get('/api/purchases/'+currentId).then(function(resp){
				console.log(resp)
				$scope.purchase = resp.data;
			})
		
		
		$scope.purchaseUpdate = function (obj) {
			console.log("obj", obj)
			$http.put('/api/purchases', obj).then(function (resp) {
				if (resp.status == 200) {
					$scope.purchase = {};
					$scope.Purchase.$setPristine();
					$scope.Purchase.$setUntouched();
					
					$timeout(function(){
						$location.path('/view-purchase')
					},500)
					
				}
			})
		}
		
		
		
	});
