var app = angular.module('cs');
app.controller('messagesController', function($scope, messageService, $state, $stateParams, firebaseService, $location, authService){
    $scope.isActive = function(route) {
        return route === $location.path();
    }

	// var me = firebaseService.getUser();
	// $scope.messages = messageService.getMyChats(me.user.id);
	// console.log($scope.messages);

  $scope.currentUser = '';
  $scope.currentUser = authService.getCurrentUser();

  if(!$scope.currentUser) {
    $location.path('/splash', {}, {reload: true});
  }

})