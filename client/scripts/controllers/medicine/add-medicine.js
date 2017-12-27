'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('AddMedicineCtrl', function ($scope, $rootScope, $http, $location, $timeout, $routeParams, Medicine) {

        $scope.Update = false;
        $scope.Add = true;

        $scope.medicine = {};
        $scope.showAlert = false;

        $http.get('/api/CategoryNames').then(function (resp) {
            console.log("resp", resp)
            $scope.categoryNames = resp.data;
        })

        /*$http.get('/api/suppliers').then(function (resp) {
            console.log("resp", resp)
            $scope.suppliers = resp.data;
        })*/



        $scope.medicineSave = function (obj) {
            console.log("obj", obj);
            var medObj = obj;

            $http.get('/api/CategoryNames/' + medObj.categoryId).then(function (resp) {
                console.log("categoryName", resp.data.CategoryName);
                medObj.categoryName = resp.data.CategoryName;
            }).catch(function (response) {
                console.error('Error', response.status, response.data);
            }).finally(function () {
                $http.get('/api/medicines').then(function (resp) {
                    console.log("medicines", resp.data);
                    if (resp.data.length == 0) {
                        $http.post('/api/medicines', medObj).then(function (resp) {
                            console.log("PostForFirstTime", resp.data);
                            if (resp.status == 200) {

                                $scope.message = "Saved Succesfully";
                                $scope.showAlert = true;

                                var stockObj = {};
                                stockObj.medicineId = resp.data.id;
                                stockObj.medicineName = resp.data.medicineName;
                                stockObj.categoryId = resp.data.categoryId;
                                stockObj.categoryName = resp.data.categoryName;
                                stockObj.purchaseQuantity = 0;
                                stockObj.saleQuantity = 0;

                                $http.post('/api/Stocks', stockObj).then(function (resp) {
                                    console.log("Stocks", resp)
                                })

                                $scope.medicine = {};
                                $scope.Medicine.$setPristine();
                                $scope.Medicine.$setUntouched();

                                $timeout(function () {
                                    $scope.showAlert = false;
                                }, 1000)

                                $timeout(function () {
                                    $location.path('/view-medicine')
                                }, 1500)
                            }
                        })
                    } else {
                        console.log("medicines", resp.data);

                        $http.get('/api/medicines/?filter[where][and][0][medicineName]=' + medObj.medicineName + '&filter[where][and][1][dosage]=' + medObj.dosage + '&filter[where][and][2][categoryName]=' + medObj.categoryName).then(function (resp) {
                            console.log("MedicineList", resp.data);
                            if (resp.data.length != 0) {
                                alert("Medicine Already Exists")
                            } else {
                                $http.post('/api/medicines', medObj).then(function (resp) {
                                    console.log("resp", resp)
                                    if (resp.status == 200) {

                                        $scope.message = "Saved Succesfully";
                                        $scope.showAlert = true;

                                        var stockObj = {};
                                        stockObj.medicineId = resp.data.id;
                                        stockObj.medicineName = resp.data.medicineName;
                                        stockObj.categoryId = resp.data.categoryId;
                                        stockObj.categoryName = resp.data.categoryName;
                                        stockObj.purchaseQuantity = 0;
                                        stockObj.saleQuantity = 0;

                                        $http.post('/api/Stocks', stockObj).then(function (resp) {
                                            console.log("Stocks", resp)
                                        })


                                        $scope.medicine = {};
                                        $scope.Medicine.$setPristine();
                                        $scope.Medicine.$setUntouched();

                                        $timeout(function () {
                                            $scope.showAlert = false;
                                        }, 1000)

                                        $timeout(function () {
                                            $location.path('/view-medicine')
                                        }, 1500)

                                    }
                                })
                            }
                        })
                    }
                });
            });




            /*$http.get('/api/CategoryNames/' + medObj.categoryId).then(function (resp) {
                console.log("categoryName", resp.data.CategoryName);
                medObj.categoryName = resp.data.CategoryName;
            }).catch(function (response) {
                console.error('Error', response.status, response.data);
            }).finally(function () {
                $http.get('/api/medicines/?filter[where][and][0][medicineName]=' + medObj.medicineName + '&filter[where][and][1][dosage]=' + medObj.dosage + '&filter[where][and][2][categoryName]=' + medObj.categoryName).then(function (resp) {
                    console.log("MedicineList", resp.data);
                    if (resp.data.length != 0) {
                        alert("Medicine Already Exists")
                    } else {
                        $http.post('/api/medicines', medObj).then(function (resp) {
                            console.log("resp", resp)
                            if (resp.status == 200) {

                                $scope.message = "Saved Succesfully";
                                $scope.showAlert = true;

                                var stockObj = {};
                                stockObj.medicineId = resp.data.id;
                                stockObj.medicineName = resp.data.medicineName;
                                stockObj.categoryId = resp.data.categoryId;
                                stockObj.categoryName = resp.data.categoryName;
                                stockObj.purchaseQuantity = 0;
                                stockObj.saleQuantity = 0;

                                $http.get('/api/medicines/?filter[where][and][0][medicineName]=' + medObj.medicineName).then(function (resp) {
                                    if (resp.data.length == 0) {
                                        $http.post('/api/Stocks', stockObj).then(function (resp) {
                                            console.log("Stocks", resp)
                                        })
                                    }
                                })


                                $scope.medicine = {};
                                $scope.Medicine.$setPristine();
                                $scope.Medicine.$setUntouched();

                                $timeout(function () {
                                    $scope.showAlert = false;
                                }, 1000)

                                $timeout(function () {
                                    $location.path('/view-medicine')
                                }, 1500)

                            }
                        })
                    }
                })
            })*/


        }

    });
