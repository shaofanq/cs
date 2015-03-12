var app = angular.module('cs');

app.controller('chatController', function($scope, chatService, firebaseService, $stateParams, $rootScope, $state, $ionicScrollDelegate, authService, $firebase, $timeout){
	// set me in the controller's scope.
	var me;

	// get all of the data
	var getData = function() {
		$scope.messages = chatService.getChat($stateParams.cid);
		$scope.authData = authService.getCurrentUser();
		me = firebaseService.getUser($scope.authData.uid);
		$scope.friend = chatService.getMyChats(me.$id);
	}();

	// scroll to bottom after the chats load
	$scope.messages.$loaded().then(function() {
		$ionicScrollDelegate.scrollBottom(true);
	})

	// set a side variable
  var side = 'left';

  // add userID to scope from the me object
	me.$loaded().then(function() {
		$scope.userId = me.$id;
	})

	// define message text
  $scope.messageText = '';

  $scope.reset = function(textMessage) {
  	form.reset()
  }

 $scope.hideTime = true;

  $scope.sendMessage = function(textMessage) {
      if(textMessage){
          $ionicScrollDelegate.scrollBottom(true);
          $scope.messages.$add({
              text: textMessage,
              senderId: $scope.userId,
              timestamp: Firebase.ServerValue.TIMESTAMP
              });
          $scope.messageText = "";
      }
  };
});
