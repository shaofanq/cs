var app = angular.module('cs');

app.controller('ExploreController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate, $state, $rootScope) {
  if(!$scope.user) {
    var auth = authService.getCurrentUser();
    $scope.user = firebaseService.getUser(auth.uid);
  }
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $rootScope.state = $state;

  var exploreRef = new Firebase('https://cancer.firebaseio.com/ean/');
  var sync = $firebase(exploreRef);

    $scope.isActive = function(a,b,c) {
        if(a === $location.path() || b === $location.path() || c === $location.path()) {
          return true;
        }
    };

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.editUser = function() {
    $state.go('secured.edit');
  };

  $scope.users = firebaseService.getUsers();

  $scope.logout = function() {
    authService.logout();
    $state.go('secured.splash');
  };

  $scope.notifications = function() {
    $state.go('secured.notifications');
  };

  $scope.goTo = function(id) {
    $state.go('secured.user-detail', {id: id});
  };

});
