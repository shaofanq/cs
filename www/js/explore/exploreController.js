var app = angular.module('cs');

app.controller('ExploreController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate, $state, $rootScope) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $rootScope.state = $state;
  console.log('fuck ', $rootScope.state);

  var exploreRef = new Firebase('https://cancer.firebaseio.com/ean/');
  var sync = $firebase(exploreRef);

    $scope.isActive = function(a,b,c) {
        if(a === $location.path() || b === $location.path() || c === $location.path()) {
          return true
        }
    }

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.editUser = function() {
    $location.path('/edit', {}, {reload: true});
  }

  $scope.users = firebaseService.getUsers();

  $scope.logout = function() {
    authService.logout();
    $location.path('/splash', {}, {reload: true});
  }

  $scope.notifications = function() {
    $location.path('/notifications', {}, {reload: true});
  }


  // $scope.currentUser = '';
  $scope.currentUser = authService.getCurrentUser();

  if(!$scope.currentUser) {
    $location.path('/splash', {}, {reload: true});
  }

  $scope.goTo = function(id) {
    $state.go('userDetail/' + id);   
  }

});