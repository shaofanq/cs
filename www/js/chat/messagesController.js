var app = angular.module('cs');
app.controller('messagesController', function($scope, messageService, $state, $stateParams, firebaseService, $location){

    $scope.isActive = function(route) {
        return route === $location.path();
    }

	// var me = firebaseService.getUser();
	// $scope.messages = messageService.getMyChats(me.user.id);
	// console.log($scope.messages);


})