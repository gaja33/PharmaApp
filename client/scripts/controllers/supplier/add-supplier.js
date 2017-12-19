'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('AddSupplierCtrl', function ($scope, $rootScope, $http, $location, $timeout, $routeParams, $uibModalInstance, $route) {

		$scope.Update = false;
		$scope.Add = true;

		$scope.headerName = "Add";

		$scope.supplier = {};

		$scope.supplierSave = function (obj) {
			console.log("obj", obj)
			$http.post('/api/suppliers', obj).then(function (resp) {
				console.log("resp", resp)
				if (resp.status == 200) {
					console.log("Saved Succesfully")
					$scope.supplier = {};
					$scope.Supplier.$setPristine();
					$scope.Supplier.$setUntouched();

					$scope.cancel();
					$route.reload();
					/*$timeout(function () {
						$location.path('/view-supplier')
					}, 500)*/

				}
			}, function errorCallback(response) {
				console.log("resp", response)
			})
		}

		$scope.cancel = function () {
			$uibModalInstance.close();
		};
	});
