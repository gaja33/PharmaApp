'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ModifyMedicineCtrl', function ($scope, $http, $location, $timeout, $routeParams) {

			$scope.Update = true;
			$scope.Add = false;
		
		$scope.medicine = {};
    
    $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
    
        $scope.popup2 = {
            opened: false
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

	
		$http.get('/api/CategoryNames').then(function (resp) {
			console.log("resp", resp)
			$scope.categoryNames = resp.data;
		})
		
		var currentId = $routeParams.id;
			$http.get('/api/medicines/'+currentId).then(function(resp){
				console.log(resp)
				$scope.medicine = resp.data;
			})
		
		
		$scope.medicineUpdate = function (obj) {
			console.log("obj", obj)
			$http.put('/api/medicines', obj).then(function (resp) {
				if (resp.status == 200) {
					$scope.medicine = {};
					$scope.Medicine.$setPristine();
					$scope.Medicine.$setUntouched();
					
					$timeout(function(){
						$location.path('/view-medicine')
					},500)
					
				}
			})
		}
		
		
		
	});
