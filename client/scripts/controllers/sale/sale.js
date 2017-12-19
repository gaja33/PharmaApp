'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('AddSaleCtrl', function ($scope, $http, $timeout, $route, $filter,$interval) {

        $scope.sale = {};
        

        var tick = function () {
            //$scope.clock = Date.now();
            $scope.invoiceDate = Date.now();
        }
        tick();
        $interval(tick, 1000);

        $scope.invDate = $filter('date')(new Date(), 'dd-MM-yyyy');

        $http.get('/api/sales').then(function (resp) {
            console.log("saleR", resp.data)
            if (resp.data.length == 0) {
                $scope.invoice = 1001;
            } else {
                $http.get('/api/sales?filter[order]=invoice%20DESC&filter[limit]=1').then(function (resp) {
                    console.log("invoice", resp.data[0])
                    $scope.invoice = resp.data[0].invoice + 1;

                });
            }
        })


        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.getLocation = function (val) {

            var URL = '/api/medicines?filter[where][medicineName][like]=%' + val + '%';
            return $http.get(URL).then(function (response) {
                //console.log(response)
                return response.data;
            });
        };

        $scope.onMedSelect = function (item, model, label, event) {
            //console.log("item", item)
            //console.log("model", model)
            //console.log("label", label)
            //console.log("event", event)

            if (item.quantity == 0) {
                $scope.sale = item;
                $scope.sale.expDate = new Date(item.expDate);

                console.log("Out od Stock")
            } else {
                $scope.sale = item;
                $scope.sale.expDate = new Date(item.expDate);
            }
        }

        $scope.calculateTotal = function (val) {
            $scope.sale.amount = val * $scope.sale.selPrice;
            console.log("$scope.sale.amount", $scope.sale.amount)
        }

        $scope.checkForDuplicate = function (sourceArray, val) {

            for (var i = 0; i < sourceArray.length; i++) {
                if (sourceArray[i].id == val.id) {
                    i = sourceArray.length - 1;
                    if (i == sourceArray.length - 1) {
                        return "exist"
                    }
                } else {
                    if (i == sourceArray.length - 1) {
                        return "not exist"
                    }

                }
            }

        }

        $scope.tableData = [];
        $scope.loopData = [];


        $scope.addToTable = function (obj, inv, invDate) {
            obj.invoice = inv;
            obj.invoiceDate = invDate;

            var dataToPushed = angular.copy(obj);
            if ($scope.tableData.length != 0) {

                var booleanData = $scope.checkForDuplicate($scope.tableData, obj);

                if (booleanData == "not exist") {
                    $scope.tableData.push(dataToPushed);
                    $scope.loopData = angular.copy($scope.tableData);
                } else {
                    console.log("exist");
                    alert("Already Exists. Please update quantity")
                }
            } else {
                $scope.tableData.push(dataToPushed);
                $scope.loopData = angular.copy($scope.tableData);
            }

            $scope.sale = {};
            console.log("$scope.tableData", $scope.tableData);

            $scope.totalAmount = 0;
            for (var i = 0; i < $scope.tableData.length; i++) {
                $scope.totalAmount += $scope.tableData[i].amount;
            }
            console.log("$scope.totalAmount", $scope.totalAmount);
        }


        $scope.delItem = function (idx) {
            $scope.tableData.splice(idx, 1);
            $scope.totalAmount = 0;
            for (var i = 0; i < $scope.tableData.length; i++) {
                $scope.totalAmount += $scope.tableData[i].amount;
            }
        }

        $scope.showEditFlag = false;

        $scope.showEdit = function (idx) {
            $scope.editIndex = idx;
            $scope.showEditFlag = true;
        }

        $scope.saveEditedData = function (idx, edited) {
            $scope.editIndex = -1;
            $scope.showEditFlag = false;
            console.log("edited", edited);
            console.log("$scope.tableData", $scope.tableData);
            $scope.tableData[idx].amount = $scope.tableData[idx].selPrice * edited.currQuantity;

            console.log("$scope.tableDataedited", $scope.tableData);
            $scope.totalAmount = 0;
            for (var i = 0; i < $scope.tableData.length; i++) {
                $scope.totalAmount += $scope.tableData[i].amount;
            }
        }

        $scope.calculateGrandAmount = function (dis) {
            $scope.disAmount = ($scope.totalAmount * parseInt(dis)) / 100;

            $scope.grandAmount = $scope.totalAmount - $scope.disAmount;
        }

        $scope.calculateChange = function (p, ga) {

            $scope.change = p - ga;
        }

        $scope.saveSalesDetails = function (arr) {
            console.log("sale", arr)

            $http.post('/api/sales', arr).then(function (resp) {
                console.log("saleresp", resp)
            })
        }



        $scope.printData = function (arr) {
            console.log("arr1", arr)


            var tableToPrint = document.getElementById("printTable");
            var totAmt = document.getElementById("totAmt").value;
            var graAmt = document.getElementById("graAmt").value;
            var dis = document.getElementById("dis").value;
            var pay = document.getElementById("pay").value;
            var chang = document.getElementById("chang").value;
            var invNum = document.getElementById("invNum").value;

            var newWin = window.open("");
            newWin.document.write('<html><head><style>.hideActionColumn{display:none;}table#printTable,th,td{border:1px solid black;border-collapse:collapse}.align-right{text-align:right;}#headingTable table,#headingTable th,#headingTable td{border:none}</style></head><body><table width="100%" id="headingTable"><tbody><tr><td width="70%"><div><h1>SAI GANESH MEDICAL</h1></div><div><p style="margin:0;">#12, Behind Shell Petrol Bunk,</p><p style="margin:0;">Kengeri Satellite Town,</p><p style="margin:0;">Bengaluru-60</p></div><br><div><p style="margin:0;"><label style="font-weight:bold;">Phone:</label><span>0132345754</span>&nbsp;<label style="font-weight:bold;">Mobile:</label><span>9880368186</span></p><p style="margin:0;"><label style="font-weight:bold;">Website:</label><span>www.saiganeshmedicals.com</span></p><p style="margin:0;"><label style="font-weight:bold;">TIN No:</label><span>5451468615865</span></p><p style="margin:0;"><label style="font-weight:bold;">DL No:</label><span>5451468615865</span></p><p style="margin:0;"><label style="font-weight:bold;">CST No:</label><span>5451468615865</span></p></div></td><td width="30%" style="vertical-align:top"><div><p><label style="font-weight:bold;font-size:20px;">Invoice No:</label><span>' + invNum + '</span></p><p><label style="font-weight:bold;font-size:20px;">Invoice Date:</label><span>' + $scope.invDate + '</span></p></div></td></tr></tbody></table><br>' + tableToPrint.outerHTML + '<br><table width="100%" id="headingTable"><tbody><tr><td width="70%"></td><td width="30%" class="align-right" style="vertical-align:top"><div><p><label style="font-weight:bold;font-size:16px;">Total Amount:</label><span>' + totAmt + '</span></p><p><label style="font-weight:bold;font-size:16px;">Discount:</label><span>' + dis + '</span></p><p><label style="font-weight:bold;font-size:16px;">Gross Amount:</label><span>' + graAmt + '</span></p><p><label style="font-weight:bold;font-size:16px;">Paid:</label><span>' + pay + '</span></p><p><label style="font-weight:bold;font-size:16px;">Change:</label><span>' + chang + '</span></p></div></td></tr></tbody></table></body></html>');
            newWin.print();
            newWin.close();

            var r = confirm("Did you print the bill?");
            if (r == true) {

                for (var i = 0; i < arr.length; i++) {
                    arr[i].medicineid = arr[i].id;

                    var quan = arr[i].quantity - arr[i].currQuantity;
                    $http.put('/api/medicines/' + arr[i].id, {
                        "quantity": quan
                    }).then(function (resp) {
                        console.log("saleresp", resp)
                    })
                }


                for (var j = 0; j < arr.length; j++) {
                    delete arr[j].id;
                }

                console.log("PostArray", arr)

                $http.post('/api/sales', arr).then(function (resp) {
                    console.log("saleresp", resp)
                })

                $route.reload();
            } else {
                console.log("Canceled")
            }

        }


        /**/



    });
