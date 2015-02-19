var app = angular.module('cs');

app.controller('chatController', function($scope, chatService, firebaseService, $stateParams, $rootScope, $state, $ionicScrollDelegate, authService, $firebase, $timeout){
	$scope.messages = chatService.getChat($stateParams.cid);   
    $scope.authData = authService.getCurrentUser();
	var me = firebaseService.getUser($scope.authData.uid);
    $scope.friend = chatService.getMyChats(me.$id);
    $scope.friend.info = firebaseService.getUser('simplelogin:67');
    console.log('friend name', $scope.friend.info.name);
    $scope.$watchCollection('messages', function(newNames, oldNames) {
        $ionicScrollDelegate.scrollBottom(true);
    });    

    setTimeout(function(){
        $ionicScrollDelegate.scrollBottom(true);
    },2000);

    var side = 'left';
    
    $scope.userId = me.$id;
    $scope.messageText = '';
    console.log('userId:', $scope.userId);   

    $scope.reset = function(textMessage) {
    	form.reset()
    }

 $scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

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




  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };



});