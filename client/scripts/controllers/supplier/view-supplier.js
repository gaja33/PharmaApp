'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ViewSupplierCtrl', function ($scope, $http, $route, $uibModal) {
		$http.get('/api/suppliers').then(function (resp) {
			console.log("resp", resp)
			$scope.suppliers = resp.data;
		})


		$scope.deleteSupplier = function (item) {
			console.log("item", item);
			$http.delete('api/suppliers/' + item).then(function (res) {
				console.log("res", res);
				$route.reload();
			})
		};

		$scope.openAddSupplier = function () {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/supplier/add-supplier.html',
				controller: 'AddSupplierCtrl',
				size: 'md',
				backdrop: 'static'
			});
		}

		$scope.openEditSupplier = function (id) {
			console.log("id", id)
			var modalInstance1 = $uibModal.open({
				animation: true,
				templateUrl: 'views/supplier/add-supplier.html',
				controller: 'ModifySupplierCtrl',
				size: 'md',
				backdrop: 'static',
				resolve: {
					getId: function () {
						return id;
					}
				}
			});
		}

	});
