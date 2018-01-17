'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('siddhiSaiMedApp')
	.controller('AddCustomerCtrl', function ($scope, $rootScope, $http, $location, $timeout, $routeParams, $uibModalInstance, $route) {

		$scope.Update = false;
		$scope.Add = true;

		$scope.headerName = "Add";

		$scope.customer = {};
    
        $scope.showAlert = false;

		$scope.customerSave = function (obj) {
			console.log("obj", obj)
			$http.post('/api/customers', obj).then(function (resp) {
				console.log("resp", resp)
				if (resp.status == 200) {
					console.log("Saved Successfully")
                    
                    $scope.message = "Saved Succesfully";
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
			}, function errorCallback(response) {
				console.log("resp", response)
			})
		}

		$scope.cancel = function () {
			$uibModalInstance.close();
		};


	});
