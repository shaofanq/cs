var app = angular.module('cs');

app.controller('notificationsController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate, $stateParams, $ionicHistory) {

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  var exploreRef = new Firebase('https://cancer.firebaseio.com/app/');
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


  $scope.authInfo = '';
  $scope.authInfo = authService.getCurrentUser();

  $scope.currentUser = firebaseService.getUser($scope.authInfo.uid);

  if(!$scope.authInfo) {
    $location.path('/login', {}, {reload: true});
  }
 
  //GET REQUESTS


  $scope.reqs = [];


  $scope.reqs = firebaseService.getFriends($scope.authInfo.uid);
  console.log($scope.reqs);

  // ACCEPT AND REJECT REQUESTS 

  $scope.acceptReq = function(id) {
      console.log(id)
      firebaseService.updateFriend($scope.authInfo.uid, id, "accepted");
      firebaseService.updateFriend(id, $scope.authInfo.uid, "accepted");

      // createChat();
  }

  $scope.rejectReq = function(id) {
      firebaseService.deleteFriend($scope.authInfo.uid, id);
      firebaseService.deleteFriend(id, $scope.authInfo.uid);
  }

   




});