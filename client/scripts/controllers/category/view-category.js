'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ViewCategoryCtrl', function ($scope, $http, $route, $uibModal) {
		$http.get('/api/CategoryNames').then(function (resp) {
			console.log("resp", resp)
			$scope.categoryNames = resp.data;
		})


		$scope.deleteCategory = function (item) {
			console.log("item", item);
			$http.delete('api/CategoryNames/' + item).then(function (res) {
				console.log("res", res);
				$route.reload();
			})
		};


		$scope.openAddCategory = function () {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/category/add-category.html',
				controller: 'AddCategoryCtrl',
				size: 'md',
				backdrop: 'static'
			});
		}

		$scope.openEditCategory = function (id) {
			console.log("id", id)
			var modalInstance1 = $uibModal.open({
				animation: true,
				templateUrl: 'views/category/add-category.html',
				controller: 'ModifyCategoryCtrl',
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
