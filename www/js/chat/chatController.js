.controller('chatCtrl', function($scope, chatService, firebaseService, $stateParams, $rootScope, $state){
	
	$scope.messages = messageService.getChat($stateParams.cid);

	var me = firebaseService.getUser();
	$scope.friend = messageService.getMyChats(me.facebook.id);
	console.log($scope.friend);

	$scope.timeStamp = function() {
		return 
	}

	console.log($scope.messages)
    var side = 'left';
    $scope.me = firebaseService.getUser();
    $scope.userId = $scope.me.facebook.id;
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