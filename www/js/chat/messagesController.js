var app = angular.module('cs');
app.controller('messagesController', function($scope, $state, $stateParams, firebaseService, chatService, $location, authService){
    $scope.isActive = function(a,b,c) {
        if(a === $location.path() || b === $location.path() || c === $location.path()) {
          return true
        }
    }

	$scope.authData = authService.getCurrentUser();
  var me = firebaseService.getUser($scope.authData.uid);
  $scope.messages = chatService.getMyChats(me.$id);
  console.log($scope.messages);

})