var app = angular.module('cs');

app.service('firebaseService', function ($firebase) {
  var firebaseUrl = 'https://cancer.firebaseio.com/';

  this.getUsers = function(){
    return $firebase(new Firebase(firebaseUrl + 'users/')).$asObject();
  };

  this.getUser = function(userId) {
    return $firebase(new Firebase(firebaseUrl + 'users/' + userId)).$asObject();
  }

  this.getThings = function(userId){
    return $firebase(new Firebase(firebaseUrl + 'users/' + userId + '/things')).$asArray(); 
  }


// ADD USERS

  this.addFriend = function(userId, otherId, theStatus) {
      var conRef = new Firebase('https://cancer.firebaseio.com/users/' + userId + '/friends' + '/' + otherId);
      var conSync = $firebase(conRef); 

        conSync.$set({
          friendId: otherId,
          status: theStatus
        })
  }


});