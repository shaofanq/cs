var app = angular.module('cs');

app.controller('UserDetailController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate, $stateParams, $ionicHistory) {
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

  $scope.logout = function() {
    authService.logout();
    $location.path('/login', {}, {reload: true});
  }

  $scope.user = firebaseService.getUser($stateParams.id);
  console.log($scope.user)

  $scope.currentUser = '';
  $scope.currentUser = authService.getCurrentUser();

  if(!$scope.currentUser) {
    $location.path('/login', {}, {reload: true});
  }


  // ADD FRIENDS AND SHIT

    $scope.addFriend = function() {
        firebaseService.addFriend($scope.currentUser.uid, $stateParams.id, "sent");
        firebaseService.addFriend($stateParams.id, $scope.currentUser.uid, "received");  
    }


});