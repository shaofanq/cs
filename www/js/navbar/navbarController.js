var app = angular.module('cs');

app.controller('NavbarController', function($scope, $ionicHistory, $state) {

  var title = $state.current.name.split('.')[1];
  $scope.title = title[0].toUpperCase() + title.substr(1); 
  $scope.goBack = function() {
    if($ionicHistory.backView.name){
      $ionicHistory.goBack();
    } else {
      $state.go('secured.explore');
    }
  }
  $scope.toggleSearch = function() {
    $scope.search = !$scope.search;
  }
});
