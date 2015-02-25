var app = angular.module('cs');

app.controller('NavbarController', function($scope, $ionicHistory, $state) {
  console.log('state', $state.current.name)
  var upp
  $scope.title = $state.current.name[0].toUpperCase() + $state.current.name.slice(1);
  $scope.goBack = function() {
    $ionicHistory.goBack();
  }
});