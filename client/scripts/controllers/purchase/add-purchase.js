'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('AddPurchaseCtrl', function ($scope, $rootScope, $http, $location, $timeout, $routeParams, $route) {

        $scope.Update = false;
        $scope.Add = true;

        $scope.purchase = {};
        $scope.medicine = {};

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
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
    
        $scope.ExpDatePopup = {
            opened: false
        };

        $scope.openExpDate = function () {
            $scope.ExpDatePopup.opened = true;
        };

        $http.get('/api/suppliers').then(function (resp) {
            //console.log("resp", resp)
            $scope.supplierNames = resp.data;
        })
        
        //$scope.purchaseDetails={medicineId:"",quantity:"",batch:"",expDate:"",mrp:"",supplierPrice:"",totalAmount:""}
        
        $scope.medicineDetailsArr = [{medicineId:"",quantity:"",quantityInStrips:"",batch:"",expDate:"",mrp:"",supplierPrice:"",totalAmount:""}]
        
        console.log("$scope.medicineDetailsArr",$scope.medicineDetailsArr)
        
        $scope.addItem =function(){
            $scope.medicineDetailsArr.push({medicineId:"",quantity:"",quantityInStrips:"",batch:"",expDate:"",mrp:"",supplierPrice:"",totalAmount:""})
        }
        
        $scope.removeItem=function(idx){
            if($scope.medicineDetailsArr.length == 1){
                alert("You cannot delete this item")
            }else{
                $scope.medicineDetailsArr.splice(idx,1)
            }
        }
        
        $scope.getMedicines = function(id){
            console.log("id",id);
            $http.get('/api/medicines?filter[where][supplierId]=' + id).then(function (resp) {
                console.log("medicine", resp.data);
                $scope.medicines = resp.data;
            })
        }
        $scope.showIfTablet =false;
        $scope.getMedicineDetails =function(id){
            console.log("id",id);
            $http.get('/api/medicines?filter[where][id]=' + id).then(function (resp) {
                console.log("medicine", resp.data);
                if(resp.data[0].categoryName == "tablet"){
                   $scope.showIfTablet =true;
                }else{
                   $scope.showIfTablet =false; 
                }
            })
        }
        
        
        
        
        
        
        
        
        

        $scope.preBalance = 0;

        $scope.getPrevBalance = function (supName) {
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
        }


        $scope.purchaseSave = function (pObj, mObj) {
            console.log("pObj", pObj)
            console.log("mObj", mObj)

            var purchaseID;

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
