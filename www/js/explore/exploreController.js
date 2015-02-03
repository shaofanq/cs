var app = angular.module('cs');

app.controller('ExploreController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  var exploreRef = new Firebase('https://cancer.firebaseio.com/');
  var sync = $firebase(exploreRef);

    $scope.isActive = function(route) {
        return route === $location.path();
    }

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.editUser = function() {
    $location.path('/edit', {}, {reload: true});
  }

  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
  };

    $scope.users = firebaseService.getUsers();



  $scope.logout = function() {
    authService.logout();
    $location.path('/login', {}, {reload: true});
  }

  $scope.getCurrentUser = function() {
    return authService.getCurrentUser();
  }
  $scope.currentUser = '';
  $scope.currentUser = $scope.getCurrentUser();

  if(!$scope.currentUser) {
    $location.path('/login', {}, {reload: true});
  }

});