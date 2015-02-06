var app = angular.module('cs');

app.controller('ExploreController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate, $state) {
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
    $location.path('/splash', {}, {reload: true});
  }



  $scope.currentUser = '';
  $scope.currentUser = authService.getCurrentUser();

  if(!$scope.currentUser) {
    $location.path('/splash', {}, {reload: true});
  }

  $scope.goTo = function(id) {
    $state.go('userDetail/' + id);   
  }

});