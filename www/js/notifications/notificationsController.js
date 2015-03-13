var app = angular.module('cs');

app.controller('notificationsController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate, $stateParams, $ionicHistory, chatService, $state) {

  var exploreRef = new Firebase('https://cancer.firebaseio.com/ean/');
  var sync = $firebase(exploreRef);

  $scope.editUser = function() {
    $state.go('secured.edit');
  }

  $scope.logout = function() {
    authService.logout();
    $location.path('secured.login');
  }


  //GET REQUESTS
  $scope.reqs = firebaseService.getFriends($scope.auth.uid);


  // ACCEPT AND REJECT REQUESTS
  $scope.acceptReq = function(id) {
      firebaseService.updateFriend($scope.auth.uid, id, "accepted");
      firebaseService.updateFriend(id, $scope.auth.uid, "accepted");

      var myChats = chatService.getMyChats($scope.auth.uid);
      var otherChats = chatService.getMyChats(id);

      otherChats.$loaded().then(function() {
        for (var i = 0; i < otherChats.length; i++) {
          for (var j = 0; j < myChats.length; j++) {
            if(myChats[i].cid === otherChats[j].cid) {
              myChats[i].status = 'active';
              otherChats[j].status = 'active';
              chatService.changeChatStatus(myChats[i].cid, otherChats[j].cid, $scope.authInfo.uid, id);
            }
          }
        }
      });
  }

  $scope.rejectReq = function(id) {
      firebaseService.deleteFriend($scope.authInfo.uid, id);
      firebaseService.deleteFriend(id, $scope.authInfo.uid);
  }



// CREATING A CHAT

  $scope.createChat = function(friendId, friendName){
      chatService.createChat($scope.auth.uid, friendId, $scope.user.name, friendName);
      var cid = $scope.auth.uid + friendId;
      $state.go('secured.chat', { cid: cid});
  };


});
