'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ModifySupplierCtrl', function ($scope, $http, $location, $timeout, $routeParams, getId, $uibModalInstance, $route) {

		$scope.Update = true;
		$scope.Add = false;

		$scope.headerName = "Update";

		$scope.supplier = {};

		/*var currentId = $routeParams.id;*/
		$scope.getId = getId;
		$http.get('/api/suppliers/' + $scope.getId).then(function (resp) {
			console.log(resp)
			$scope.supplier = resp.data;
		})


		$scope.supplierUpdate = function (obj) {
			console.log("obj", obj)
			$http.put('/api/suppliers', obj).then(function (resp) {
				if (resp.status == 200) {
					$scope.supplier = {};
					$scope.Supplier.$setPristine();
					$scope.Supplier.$setUntouched();

					$scope.cancel();
					$route.reload();
					/*$timeout(function () {
						$location.path('/view-supplier')
					}, 500)*/

				}
			})
		}

		$scope.cancel = function () {
			$uibModalInstance.close();
		};

	});
