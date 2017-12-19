'use strict';

/**
 * @ngdoc overview
 * @name kamakshiJewellersApp
 * @description
 * # kamakshiJewellersApp
 *
 * Main module of the application.
 */
angular
	.module('kamakshiJewellersApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularFileUpload',
    'ui.bootstrap'
  ])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home/home.html',
				controller: 'HomeCtrl'
			})
			.when('/add-category', {
				templateUrl: 'views/category/add-category.html',
				controller: 'AddCategoryCtrl'
			})
			.when('/view-category', {
				templateUrl: 'views/category/view-category.html',
				controller: 'ViewCategoryCtrl'
			})
			.when('/modify-category/:id', {
				templateUrl: 'views/category/add-category.html',
				controller: 'ModifyCategoryCtrl'
			})
			.when('/view-supplier', {
				templateUrl: 'views/supplier/view-supplier.html',
				controller: 'ViewSupplierCtrl'
			})
			.when('/add-supplier', {
				templateUrl: 'views/supplier/add-supplier.html',
				controller: 'AddSupplierCtrl'
			})
			.when('/modify-supplier/:id', {
				templateUrl: 'views/supplier/add-supplier.html',
				controller: 'ModifySupplierCtrl'
			})
			.when('/view-customer', {
				templateUrl: 'views/customer/view-customer.html',
				controller: 'ViewCustomerCtrl'
			})
			.when('/add-customer', {
				templateUrl: 'views/customer/add-customer.html',
				controller: 'AddCustomerCtrl'
			})
			.when('/modify-customer/:id', {
				templateUrl: 'views/customer/add-customer.html',
				controller: 'ModifyCustomerCtrl'
			})
			.when('/view-medicine', {
				templateUrl: 'views/medicines/view-medicine.html',
				controller: 'ViewMedicineCtrl'
			})
			.when('/add-medicine', {
				templateUrl: 'views/medicines/add-medicine.html',
				controller: 'AddMedicineCtrl'
			})
			.when('/modify-medicine/:id', {
				templateUrl: 'views/medicines/add-medicine.html',
				controller: 'ModifyMedicineCtrl'
			})
			.when('/view-purchase', {
				templateUrl: 'views/purchase/view-purchase.html',
				controller: 'ViewPurchaseCtrl'
			})
			.when('/add-purchase', {
				templateUrl: 'views/purchase/add-purchase.html',
				controller: 'AddPurchaseCtrl'
			})
			.when('/modify-purchase/:id', {
				templateUrl: 'views/purchase/add-purchase.html',
				controller: 'ModifyPurchaseCtrl'
			})
			.when('/sale', {
				templateUrl: 'views/sale/sale.html',
				controller: 'AddSaleCtrl'
			})
			.when('/view-sale', {
				templateUrl: 'views/sale/view-sales.html',
				controller: 'ViewSaleCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(false).hashPrefix('');
	});
