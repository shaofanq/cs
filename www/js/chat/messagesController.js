.controller('messagesController', function($scope, messageService, $state, $stateParams, firebaseService){

	var me = firebaseService.getUser();
	$scope.messages = messageService.getMyChats(me.facebook.id);
	console.log($scope.messages);


})