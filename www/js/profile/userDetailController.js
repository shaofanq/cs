var app = angular.module('cs');

app.controller('UserDetailController', function($scope, authService, $state, $firebase, firebaseService, $location, $ionicSideMenuDelegate, $stateParams, $ionicHistory) {
  $scope.green = false;
  $scope.onTap = function() {
    $scope.green = true;
  }
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  var exploreRef = new Firebase('https://cancer.firebaseio.com/ean/');
  var sync = $firebase(exploreRef);

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.editUser = function() {
    $state.go('secured.edit');
  }

  $scope.isActive = function(viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
  };

  $scope.logout = function() {
    authService.logout();
    $state.go('splash');
  }

  // ADD FRIENDS AND SHIT
    $scope.addFriend = function() {
        // firebaseService.addFriend($scope.authInfo.uid, $stateParams.id, "sent", $scope.user.name, $scope.currentUser.name);
        // firebaseService.addFriend($stateParams.id, $scope.authInfo.uid, "received", $scope.currentUser.name);
    }
});
