var app = angular.module('cs');

app.controller('notificationsController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate, $stateParams, $ionicHistory, chatService, $state) {


  $scope.isActive = function(a,b,c) {
      if(a === $location.path() || b === $location.path() || c === $location.path()) {
        return true
      }
  }

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  var exploreRef = new Firebase('https://cancer.firebaseio.com/ean/');
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


  // ACCEPT AND REJECT REQUESTS

  $scope.acceptReq = function(id) {
      firebaseService.updateFriend($scope.authInfo.uid, id, "accepted");
      firebaseService.updateFriend(id, $scope.authInfo.uid, "accepted");
      
      var myChats = chatService.getMyChats($scope.authInfo.uid);
      var otherChats = chatService.getMyChats(id);
      setTimeout(function() {
        for (var i = 0; i < otherChats.length; i++) {
          for (var j = 0; j < myChats.length; j++) {
            if(myChats[i].cid === otherChats[j].cid) {
              myChats[i].status = 'active';
              otherChats[j].status = 'active';
              chatService.changeChatStatus(myChats[i].cid, otherChats[j].cid, $scope.authInfo.uid, id);
            }
          }
        }
      }, 500);

  }

  $scope.rejectReq = function(id) {
      firebaseService.deleteFriend($scope.authInfo.uid, id);
      firebaseService.deleteFriend(id, $scope.authInfo.uid);
  }



// CREATING A CHAT

  $scope.createChat = function(friendId, friendName){
      chatService.createChat($scope.currentUser.auth.uid, friendId, $scope.currentUser.name, friendName);
      var cid = $scope.currentUser.auth.uid + friendId;
      $location.path('chat/' + cid);
  };






});
