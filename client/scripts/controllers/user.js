'use strict';
angular.module('siddhiSaiMedApp')
    .controller('UserCtrl', function ($scope, User) {
        $scope.users = User.find(function(list) {});
        console.log("$scope.users",$scope.users)
    });
