var app = angular.module('cs');

app.controller('chatController', function ($scope, chatsRef, chatService) {
    // set me in the controller's scope.
    var me;

    $scope.messages = chatsRef;

    // get all of the data
    var getData = function () {
        $scope.friend = chatService.getMyChats($scope.user.$id);
    }();

    // set a side variable
    var side = 'left';

    // define message text
    $scope.messageText = '';

    $scope.reset = function (textMessage) {
        form.reset();
    }

    $scope.hideTime = true;

    $scope.sendMessage = function (textMessage) {
        if (textMessage) {
            $scope.messages.$add({
                text: textMessage,
                senderId: $scope.user.$id,
                timestamp: Firebase.ServerValue.TIMESTAMP
            });
            $scope.messageText = "";
        }
    };
});
