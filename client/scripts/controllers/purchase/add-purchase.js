'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('siddhiSaiMedApp')
    .controller('AddPurchaseCtrl', function ($scope, $rootScope, $http, $location, $timeout, $routeParams, $route) {

        $scope.Update = false;
        $scope.Add = true;

        $scope.purchase = {};
        $scope.purchaseDetails = {};
        $scope.medicine = {};

        $scope.purchase.purchaseDate = new Date();

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.InvDatePopup = {
            opened: false
        };

        $scope.openInvDate = function () {
            $scope.InvDatePopup.opened = true;
        };

        $scope.PurDatePopup = {
            opened: false
        };

        $scope.openPurDate = function () {
            $scope.PurDatePopup.opened = true;
        };

        $scope.dateOptionsExp = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            startingDay: 1,
            minMode: 'month'
        };

        $scope.ExpDatePopup = {
            opened: false
        };

        $scope.openExpDate = function ($event, medicineDetails) {
            $event.preventDefault();
            $event.stopPropagation();
            medicineDetails.opened = true;

        };

        $http.get('/api/suppliers').then(function (resp) {
            //console.log("resp", resp)
            $scope.supplierNames = resp.data;
        })

        $scope.medicineDetailsArr = [{
            medicineId: "",
            quantity: "",
            quantityInStrips: "",
            batch: "",
            expDate: "",
            mrp: "",
            supplierPrice: "",
            discount: "",
            gst: "",
            totalAmount: ""
		}]

        $scope.getMedicines = function (id) {
            console.log("id", id);
            $http.get('/api/medicines?filter[where][supplierId]=' + id).then(function (resp) {
                console.log("medicine", resp.data);
                $scope.medicinesArr = resp.data;
            }).catch(function (response) {
                console.error('Error', response.status, response.data);
            }).finally(function () {
                $http.get('/api/suppliers?filter[where][supplierId]=' + id).then(function (resp) {
                    console.log("suppliers", resp.data);
                    $scope.purchase.supplierName = resp.data[0].supplierName;
                })
            })
        }

        $scope.getSupplierName = function (id) {
            console.log("id", id);
            $http.get('/api/suppliers/' + id).then(function (resp) {
                console.log("suppliers", resp.data);
                $scope.purchase.supplierName = resp.data.supplierName;
            })
        }

        $http.get('/api/medicines').then(function (resp) {
            console.log("medicine", resp.data);
            $scope.medicinesArr = resp.data;
        })

        $scope.showIfTablet = false;

        $scope.getMedicineDetails = function (id, medDet) {
            console.log("id", id);
            $http.get('/api/medicines?filter[where][id]=' + id).then(function (resp) {
                console.log("medicine", resp.data);
                if (resp.data.length != 0) {
                    if (resp.data[0].categoryName == "tablet" || resp.data[0].categoryName == "tablet") {
                        $scope.showIfTablet = true;
                    } else {
                        $scope.showIfTablet = false;
                    }
                    medDet.discount = resp.data[0].discount;
                    medDet.gst = resp.data[0].gst;
                    medDet.category = resp.data[0].categoryName;
                }
            })
        }

        //var TotalAmount;

        $scope.calculateIndTotal = function (supPrice, medDe) {
            medDe.totalAmountAfterDiscount = (supPrice * medDe.quantity) - ((supPrice * medDe.quantity) * (medDe.discount / 100));
            medDe.totalAmount = medDe.totalAmountAfterDiscount + ((medDe.totalAmountAfterDiscount) * (medDe.gst / 100));
            medDe.totalAmount = parseFloat(medDe.totalAmount.toFixed(2));
            //TotalAmount = medDe.totalAmount;

            $scope.purchaseDetails.subTotal = 0;
            for (var i = 0; i < $scope.medicineDetailsArr.length; i++) {
                $scope.purchaseDetails.subTotal = parseFloat($scope.purchaseDetails.subTotal.toFixed(2)) + parseFloat($scope.medicineDetailsArr[i].totalAmount.toFixed(2));
                $scope.purchaseDetails.subTotal = parseFloat($scope.purchaseDetails.subTotal.toFixed(2));
            }

            $scope.purchaseDetails.grandTotal = parseFloat($scope.purchaseDetails.preBalance.toFixed(2)) + parseFloat($scope.purchaseDetails.subTotal.toFixed(2));

            $scope.purchaseDetails.grandTotal = Math.round($scope.purchaseDetails.grandTotal);
        }

        $scope.purchaseDetails.preBalance = 0;

        $scope.addItem = function () {
            $scope.medicineDetailsArr.push({
                medicineId: "",
                quantity: "",
                quantityInStrips: "",
                batch: "",
                expDate: "",
                mrp: "",
                supplierPrice: "",
                discount: "",
                gst: "",
                totalAmount: 0
            })
        }

        $scope.removeItem = function (idx) {
            if ($scope.medicineDetailsArr.length == 1) {
                alert("You cannot delete this item")
            } else {
                $scope.medicineDetailsArr.splice(idx, 1)
            }
            $scope.purchaseDetails.subTotal = 0;
            for (var i = 0; i < $scope.medicineDetailsArr.length; i++) {
                $scope.purchaseDetails.subTotal = parseFloat($scope.purchaseDetails.subTotal.toFixed(2)) + parseFloat($scope.medicineDetailsArr[i].totalAmount.toFixed(2));
                $scope.purchaseDetails.subTotal = parseFloat($scope.purchaseDetails.subTotal.toFixed(2));
            }

            $scope.purchaseDetails.grandTotal = parseFloat($scope.purchaseDetails.preBalance.toFixed(2)) + parseFloat($scope.purchaseDetails.subTotal.toFixed(2));

            $scope.purchaseDetails.grandTotal = Math.round($scope.purchaseDetails.grandTotal);
        }

        $scope.calculateBalance = function (p, gT) {
            $scope.purchaseDetails.prevBalance = gT - p;

            $scope.roundoff = Math.abs(parseInt($scope.purchaseDetails.prevBalance));
        }





        /*$scope.getPrevBalance = function (supName) {
        	console.log("supName", supName);
        	$http.get('/api/purchases?filter[where][supplier]=' + supName).then(function (resp) {
        		console.log("supDetails", resp.data);
        		if (resp.data.length == 0) {
        			$scope.preBalance = 0;
        		} else {
        			$scope.preBalance = resp.data[resp.data.length - 1].prevBalance;
        		}
        	})
        }

        $scope.medArray = [];

        $scope.addMedicines = function (medObj) {
        	console.log("medObj", medObj);
        	medObj.total = medObj.quantity * medObj.buyPrice;

        	$scope.medArray.push(medObj)
        	$scope.medicine = {};
        	$scope.Medicine1.$setPristine();
        	$scope.Medicine1.$setUntouched();

        	$scope.purchase.subTotal = 0;
        	for (var i = 0; i < $scope.medArray.length; i++) {
        		$scope.purchase.subTotal += $scope.medArray[i].total;
        	}
        }

        $scope.deleteMedData = function (idx) {
        	$scope.medArray.splice(idx, 1);
        	$scope.purchase.subTotal = 0;
        	for (var i = 0; i < $scope.medArray.length; i++) {
        		$scope.purchase.subTotal += $scope.medArray[i].total;
        	}
        }

        $scope.calculateTotalDiscount = function (dis, tot, prevB) {
        	$scope.totalDis = (dis * tot) / 100;

        	$scope.purchase.total = tot - $scope.totalDis;


        	$scope.purchase.grandTotal = $scope.purchase.total + prevB;
        }


        $scope.calculateBalance = function (p, gT) {
        	$scope.purchase.prevBalance = gT - p;
        }*/


        $scope.purchaseSave = function (pObj, mObj, purchaseDet) {
            console.log("pObj", pObj)
            console.log("mObj", mObj)
            console.log("purchaseDet", purchaseDet)

            pObj.grandTotal = purchaseDet.subTotal;
            pObj.prevBalance = purchaseDet.prevBalance;

            var supMedIdMapArr = [];

            angular.forEach(mObj, function (val, key) {
                console.log("val", val)
                $http.get('/api/Stocks/?filter[where][medicineId]=' + val.medicineId).then(function (resp) {
                    console.log("Stocks", resp.data);
                    if (resp.data[0].purchaseQuantity == null || resp.data[0].purchaseQuantity == 0) {
                        mObj[key].prevPurchaseQunatity = 0;
                    } else {
                        mObj[key].prevPurchaseQunatity = resp.data[0].purchaseQuantity;
                    }

                })

                supMedIdMapArr.push({
                    medicineId: mObj[key].medicineId,
                    supplierId: pObj.supplierId
                })

            })

            console.log("afterAddingprevQunatity", mObj)
            console.log("supMedIdMapArr", supMedIdMapArr)

            $scope.showAlert = false;

            var purchaseID;
            $http.post('/api/purchases', pObj).then(function (resp) {
                    console.log("resp", resp)
                    purchaseID = resp.data.id;

                    if (resp.status == 200) {

                        $scope.message = "Purchase Saved Succesfully";
                        $scope.showAlert = true;

                        $scope.purchase = {};
                        $scope.Purchase.$setPristine();
                        $scope.Purchase.$setUntouched();

                        $timeout(function () {
                            $scope.showAlert = false;
                        }, 500)

                    }
                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                })
                .finally(function () {
                    for (var i = 0; i < mObj.length; i++) {
                        mObj[i].purchaseId = purchaseID;

                        if (mObj[i].category == 'Tablet' || mObj[i].category == 'tablet') {
                            mObj[i].quantity = mObj[i].quantity * mObj[i].quantityInStrips;
                            mObj[i].pricePerUnit = parseFloat((mObj[i].mrp / mObj[i].quantity).toFixed(2));
                            mObj[i].subTotal = purchaseDet.subTotal;
                            mObj[i].preBalance = purchaseDet.preBalance;
                            mObj[i].grandTotal = purchaseDet.grandTotal;
                            mObj[i].paid = purchaseDet.paid;
                            mObj[i].prevBalance = purchaseDet.prevBalance;
                            mObj[i].medicineId = parseInt(mObj[i].medicineId);

                            mObj[i].quantityStock = mObj[i].prevPurchaseQunatity + mObj[i].quantity;

                            $http.post('/api/Stocks/update?[where][medicineId]=' + mObj[i].medicineId, {
                                purchaseQuantity: mObj[i].quantityStock
                            }).then(function (resp) {
                                console.log("Stocks", resp.data);

                                if (resp.status == 200) {

                                    $scope.message = "Stocks Saved Succesfully";
                                    $scope.showAlert = true;

                                    $timeout(function () {
                                        $scope.showAlert = false;
                                    }, 500)

                                }
                            })

                        } else {
                            mObj[i].quantity = mObj[i].quantity;
                            mObj[i].pricePerUnit = mObj[i].mrp;
                            mObj[i].subTotal = purchaseDet.subTotal;
                            mObj[i].preBalance = purchaseDet.preBalance;
                            mObj[i].grandTotal = purchaseDet.grandTotal;
                            mObj[i].paid = purchaseDet.paid;
                            mObj[i].prevBalance = purchaseDet.prevBalance;
                            mObj[i].medicineId = parseInt(mObj[i].medicineId);

                            mObj[i].quantityStock = mObj[i].prevPurchaseQunatity + mObj[i].quantity;

                            $http.post('/api/Stocks/update?[where][medicineId]=' + mObj[i].medicineId, {
                                purchaseQuantity: mObj[i].quantityStock
                            }).then(function (resp) {
                                console.log("Stocks", resp.data);

                                if (resp.status == 200) {

                                    $scope.message = "Stocks Saved Succesfully";
                                    $scope.showAlert = true;

                                    $timeout(function () {
                                        $scope.showAlert = false;
                                    }, 500)

                                }
                            })
                        }
                    }
                    console.log("DONE");
                });
            console.log("mObj", mObj)

            $timeout(function () {
                $http.post('/api/PurchaseDetails', mObj).then(function (resp) {
                    console.log("PurchaseDetails", resp)

                    if (resp.status == 200) {

                        $scope.message = "PurchaseDetails Saved Succesfully";
                        $scope.showAlert = true;
                        
                        
                        $timeout(function () {
                            $scope.showAlert = false;
                        }, 500)

                    }
                })
            }, 1000)

            $timeout(function () {
                $http.post('/api/medicine_supplier_mappers', supMedIdMapArr).then(function (resp) {
                    console.log("MapperDetails", resp.data)
                    
                    if (resp.status == 200) {

                        $scope.message = "Med Sup Id's Saved Succesfully";
                        $scope.showAlert = true;

                        $timeout(function () {
                            $scope.showAlert = false;
                        }, 500)
                        
                        $route.reload();

                    }
                })
            }, 2000)

            /*$http.post('/api/purchases', pObj).then(function (resp) {
                    console.log("resp", resp)
                    purchaseID = resp.data.id;

                    if (resp.status == 200) {
                    	$scope.purchase = {};
                    	$scope.Purchase.$setPristine();
                    	$scope.Purchase.$setUntouched();

                    	$timeout(function () {
                    		$location.path('/view-purchase')
                    	}, 500)

                    }
                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                })
                .finally(function () {
                    for (var i = 0; i < mObj.length; i++) {
                        mObj[i].purchaseId = purchaseID;

                        if (mObj[i].category == 'Tablet' || mObj[i].category == 'tablet') {
                            mObj[i].quantity = mObj[i].quantity * mObj[i].quantityInStrips;
                            mObj[i].pricePerUnit = (mObj[i].mrp / mObj[i].quantity).toFixed(2);

                        } else {
                            mObj[i].quantity = mObj[i].quantity;
                            mObj[i].pricePerUnit = mObj[i].mrp;
                        }
                    }
                    console.log("DONE");
                });


            console.log("After Post", mObj);



            $timeout(function () {
                $http.post('/api/medicines', mObj).then(function (resp) {
                    console.log("Mresp", resp)
                })
            }, 1000)

            $route.reload();*/
        }


    });
