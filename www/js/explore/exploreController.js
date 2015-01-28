var app = angular.module('cs');

app.controller('ExploreController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate) {
  var exploreRef = new Firebase('https://cancer.firebaseio.com/');
  var sync = $firebase(exploreRef);

  $scope.explore = true;
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.editUser = function() {
    $location.path('/edit');
  }

  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
  };

    $scope.users = firebaseService.getUsers();
    console.log('fu', $scope.users)


  $scope.logout = function() {
    authService.logout();
    $location.path('/main');
  }

  $scope.getCurrentUser = function() {
    return authService.getCurrentUser();
  }
  $scope.currentUser = '';
  $scope.currentUser = $scope.getCurrentUser();
  console.log($scope.currentUser);

  if(!$scope.currentUser) {
    $location.path('/login');
  }

});