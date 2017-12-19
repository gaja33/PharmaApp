'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ViewCustomerCtrl', function ($scope, $http, $route, $uibModal) {
		$http.get('/api/customers').then(function (resp) {
			console.log("resp", resp)
			$scope.customers = resp.data;
		})


		$scope.deleteCustomer = function (item) {
			console.log("item", item);
			$http.delete('api/customers/' + item).then(function (res) {
				console.log("res", res);
				$route.reload();
			})
		};


		$scope.openAddCustomer = function () {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/customer/add-customer.html',
				controller: 'AddCustomerCtrl',
				size: 'md',
				backdrop: 'static'
			});
		}

		$scope.openEditCustomer = function (id) {
			console.log("id", id)
			var modalInstance1 = $uibModal.open({
				animation: true,
				templateUrl: 'views/customer/add-customer.html',
				controller: 'ModifyCustomerCtrl',
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
