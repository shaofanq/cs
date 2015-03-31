var app = angular.module('cs');

app.service('firebaseService', function ($firebase, $ionicScrollDelegate, chatService) {
  var firebaseUrl = 'https://cancer.firebaseio.com/ean/';

  this.getUsers = function(){
    return $firebase(new Firebase(firebaseUrl + 'users/')).$asObject();
  };

    this.getUser = function(userId) {
        return $firebase(new Firebase(firebaseUrl + 'users/' + userId)).$asObject();
    };
    this.getProfile = function (userId) {
        return $firebase(new Firebase(firebaseUrl + 'users/' + userId)).$asObject();
    };

    this.getFloor = function() {
        return $firebase(new Firebase(firebaseUrl + '/floorPosts')).$asArray();
    };

    this.getFloorPost = function(id) {
        return $firebase(new Firebase(firebaseUrl + '/floorPosts/' + id)).$asObject();
    };

  this.getFavoritePosts = function (id) {
      return $firebase(new Firebase(firebaseUrl + 'users/' + id + '/favorites/posts/')).$asArray();
  };

    this.getComments = function(id) {
        return $firebase(new Firebase(firebaseUrl + '/floorPosts/' + id + '/comments')).$asArray();
    };

    this.addComment = function(postId, newComment, commentsCount) {
        var sync = $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId + '/comments'));
        var commentSync = $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId));
        sync.$push(newComment);
        commentSync.$update({ commentsCount: commentsCount });
    };

    this.getCurrentComments = function(postId) {
        return $firebase(new Firebase(firebaseUrl + '/floorPosts/' + postId + '/comments')).$asArray();
    };

    this.addLike = function(postId, newLikes, userId) {
        var sync = {
            user: $firebase(new Firebase(firebaseUrl + 'users/' + userId + '/favorites/posts')),
            floor: $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId)),
            list: $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId + '/admirers'))
        };
        sync.user.$push(postId);
        sync.floor.$update({ likes: newLikes });
        sync.list.$push(userId);
    };

  this.addCommentLike = function(commentId, newLikes, postId, userId) {
      var sync = {
          user: $firebase(new Firebase(firebaseUrl + 'users/' + userId + '/favorites/comments')),
          comment: $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId + '/comments/' + commentId)),
          admirers: $firebase(new Firebase(firebaseUrl + 'floorPosts/' + postId + '/comments/' + commentId + '/admirers'))
      };
    sync.user.$push(commentId);
    sync.comment.$update({likes: newLikes});
    sync.admirers.$push(userId);
  };

// ADD USERS

    this.addFriend = function(userId, otherId, theStatus, theName, currentUserName) {
        var sync = $firebase(new Firebase('https://cancer.firebaseio.com/ean/users/' + userId + '/friends/' + otherId));
        sync.$set({
            friendId: otherId,
            name: theName,
            status: theStatus
        });
        chatService.createChat(userId, otherId, currentUserName, theName)
    };

// CONNECTIONS & NOTIFICATIONS

  this.getFriends = function(id) {
      return $firebase(new Firebase(firebaseUrl + 'users/' + id + '/friends')).$asArray();
  }

    this.updateFriend = function(userId, otherId, theStatus) {
        var upRef = new Firebase('https://cancer.firebaseio.com/ean/users/' + userId + '/friends/' + otherId);
        var upSync = $firebase(upRef);

        upSync.$update({
            status: theStatus
        });
    };


    this.deleteFriend = function(userId, otherId) {
        var delRef = new Firebase('https://cancer.firebaseio.com/ean/users/' + userId + '/friends/' + otherId);
        var delSync = $firebase(delRef);

        delSync.$remove();
    };
    
});
