'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('AddCustomerCtrl', function ($scope, $rootScope, $http, $location, $timeout, $routeParams, $uibModalInstance, $route) {

		$scope.Update = false;
		$scope.Add = true;

		$scope.headerName = "Add";

		$scope.customer = {};

		$scope.customerSave = function (obj) {
			console.log("obj", obj)
			$http.post('/api/customers', obj).then(function (resp) {
				console.log("resp", resp)
				if (resp.status == 200) {
					console.log("Saved Successfully")

					$scope.customer = {};
					$scope.Customer.$setPristine();
					$scope.Customer.$setUntouched();

					$scope.cancel();
					$route.reload();
					/*$timeout(function () {
					    $location.path('/view-customer')
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
