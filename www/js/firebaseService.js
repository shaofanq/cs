var app = angular.module('cs');

app.service('firebaseService', function ($firebase, $ionicScrollDelegate, chatService) {
  var firebaseUrl = 'https://cancer.firebaseio.com/ean/';

  this.getUsers = function(){
    return $firebase(new Firebase(firebaseUrl + 'users/')).$asObject();
  };

  this.getUser = function(userId) {
    return $firebase(new Firebase(firebaseUrl + 'users/' + userId)).$asObject();
  }

  this.getFloor = function() {
    return $firebase(new Firebase(firebaseUrl + '/floorPosts')).$asArray();
  }

  this.getFloorPost = function(id) {
    return $firebase(new Firebase(firebaseUrl + '/floorPosts/' + id)).$asObject();
  }

  this.addComment = function(postId, newComment, commentsCount) {
   var sync = $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId + '/comments'));
   var commentSync = $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId));
   sync.$push(newComment);
   commentSync.$update({commentsCount: commentsCount});
  }

  this.getCurrentComments = function(postId) {
    return $firebase(new Firebase(firebaseUrl + '/floorPosts/' + postId + '/comments')).$asArray();
  }

  this.addLike = function(postId, newLikes, userId) {
    var userSync = $firebase(new Firebase(firebaseUrl + 'users/' + userId + '/favorites/posts'));
    var floorSync = $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId));
    userSync.$push(postId);
    floorSync.$update({likes: newLikes});
  }

  this.addCommentLike = function(commentId, newLikes, postId, userId) {
    debugger;
    var userSync = $firebase(new Firebase(firebaseUrl + 'users/' + userId + '/favorites/comments'));
    var commentSync = $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId + '/comments/' + commentId));
    userSync.$push(commentId);
    commentSync.$update({likes: newLikes});
  };

// ADD USERS

  this.addFriend = function(userId, otherId, theStatus, theName, currentUserName) {
    console.log(userId, otherId, theStatus, theName, currentUserName);
      var conRef = new Firebase('https://cancer.firebaseio.com/ean/users/' + userId + '/friends/' + otherId);
      var conSync = $firebase(conRef); 

        conSync.$set({
          friendId: otherId,
          name: theName,
          status: theStatus
        });
        chatService.createChat(userId, otherId, currentUserName, theName)
  }

// CONNECTIONS & NOTIFICATIONS

  this.getFriends = function(id) {
      return $firebase(new Firebase(firebaseUrl + 'users/' + id + '/friends')).$asArray();
  }

  this.updateFriend = function(userId, otherId, theStatus) {
      var upRef = new Firebase('https://cancer.firebaseio.com/ean/users/' + userId + '/friends/' + otherId);
      var upSync = $firebase(upRef); 

      upSync.$update({
        status: theStatus
      })
  }

  this.deleteFriend = function(userId, otherId) {
      var delRef = new Firebase('https://cancer.firebaseio.com/ean/users/' + userId + '/friends/' + otherId);
      var delSync = $firebase(delRef); 

      delSync.$remove();
  }




});