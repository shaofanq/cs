var app = angular.module('cs');
app.controller('chatController', function($scope, chatService, firebaseService, $stateParams, $rootScope, $state, authService){
	
	$scope.messages = chatService.getChat($stateParams.cid);   
    $scope.authData = authService.getCurrentUser();
	var me = firebaseService.getUser($scope.authData.uid);
	
    $scope.friend = chatService.getMyChats(me.$id);
	console.log($scope.friend);

	$scope.timeStamp = function() {
		return 
	}

	console.log($scope.messages)
    var side = 'left';
    
    $scope.userId = me.$id;
    $scope.messageText = '';
    console.log('userId:', $scope.userId);   
    
    $scope.sendMessage = function(textMessage) {
        $scope.messages.$add({
        	text: textMessage, 
        	senderId: $scope.userId,
        	timestamp: Firebase.ServerValue.TIMESTAMP
        });
    console.log($scope.form)
        };

    $scope.reset = function(textMessage) {
    	form.reset()
    }


  	// $scope.goTo = function(scrn) {
  	// 	$state.go(scrn);
  	// }
});