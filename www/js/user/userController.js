var app = angular.module('cs');

app.controller('UserController', function($scope, firebaseService, authService, ipCookie) {


  $scope.user = authService.getCurrentUser();

  $scope.userData = firebaseService.getUser('1').then(function(data) {return data});
  
});