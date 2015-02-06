var app = angular.module('cs');

app.controller('NavbarController', function($scope, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  }
});