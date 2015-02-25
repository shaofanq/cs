var app = angular.module('cs');

app.factory('chatService', function($firebase, $q, $ionicScrollDelegate){
  var fireUrl = 'https://cancer.firebaseio.com/app/';
  var fireSync = new Firebase(fireUrl);

    function createChatNode(chatNodeId, userId){
      var deferred = $q.defer();

      var chatsRef = new Firebase(fireUrl + "chats"); 
      var chatsSync = $firebase(chatsRef);
      
      chatsSync.$set(chatNodeId, {
        cid: chatNodeId,
        messages: [{
            text: '',
            senderId: userId,
            side: '',
            timeStamp: ''
          }]
        }).then(function(data){
          deferred.resolve(data);
        })
      return deferred.promise;
    };

    function addChatToUser(userId, friendUserId, chatNodeId, friendName){
      var myChatsRef = new Firebase(fireUrl + 'users/' + userId + "/myChats"); 
      var myChatsSync = $firebase(myChatsRef);

      myChatsSync.$set(chatNodeId, {
          cid: chatNodeId,
          chatters: {
            id: friendUserId, 
            name: friendName
          },
          status: 'deactivated'
      });
    } 


    return{
      createChat: function(myId, friendId, myName, friendName){
        var guid = function() {
          var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }
        var chatNodeId = guid();
        
        createChatNode(chatNodeId, myId).then(function(data){
          addChatToUser(myId, friendId, chatNodeId, friendName);
          addChatToUser(friendId, myId, chatNodeId, myName);
        })
      },
    
      getMessages: function(){
        return $firebase(new Firebase(fireUrl + 'chats/')).$asArray();
      },

      getChat: function(cid){
        return $firebase(new Firebase(fireUrl + 'chats/' + cid + '/messages')).$asArray();
      },

      getMyChats: function(userId){
        return $firebase(new Firebase(fireUrl + 'users/' + userId + '/myChats')).$asArray();
      }


    }

});