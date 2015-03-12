var app = angular.module('cs');

app.controller('NavbarController', function($scope, $ionicHistory, $state) {
  var upp
  $scope.title = $state.current.name[0].toUpperCase() + $state.current.name.slice(1);
  $scope.goBack = function() {
    if($ionicHistory.backView.name){
      $ionicHistory.goBack();
    } else {
      $state.go('explore');
    }
  }
  $scope.toggleSearch = function() {
    $scope.search = !$scope.search;
  }
});
