'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('siddhiSaiMedApp')
	.controller('ViewStocksCtrl', function ($scope, $http, $route, $uibModal) {
		$http.get('/api/stocks').then(function (resp) {
			console.log("resp", resp)
			$scope.stocks = resp.data;
		})

	});
