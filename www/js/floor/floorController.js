var app = angular.module('cs');

app.controller('FloorController', function($scope, authService, $firebase, firebaseService) {
  $scope.post = {};
  $scope.currentUser = authService.getCurrentUser();
  var id = $scope.currentUser.uid;
  $scope.getCurrentUser = function(){
    $scope.user = firebaseService.getUser(id);
    console.log($scope.user);
  }()
  var floorRef = new Firebase('https://cancer.firebaseio.com/app/floorPosts');
  var sync = $firebase(floorRef);

  $scope.addPost = function() {
    var d = new Date();
    $scope.post.timestamp = d.toString();
    $scope.post.user = $scope.user.name;
    $scope.post.likes = 0;
    $scope.post.comments = [];
    $scope.post.commentsCount = $scope.post.comments.length;
    sync.$push($scope.post);
    $scope.post = {};
  }


    $scope.floor = firebaseService.getFloor();

  $scope.like = function(index) {
    if(!$scope.user.favorites) {
      console.log('first like!');
      $scope.floor[index].likes = $scope.floor[index].likes + 1;
      firebaseService.addLike($scope.floor[index].$id, $scope.floor[index].likes, id);
    }
    var flag = false;
    for(key in $scope.user.favorites) {
      console.log('my favs', $scope.user.favorites[key]);
      console.log('the one i favorited', $scope.floor[index].$id);
      if($scope.user.favorites[key] === $scope.floor[index].$id) {
        flag = false;
        console.log('you can not do that!');
      } else {
        flag = true;
      }
    };
    if(flag) {
      flag = false;
      $scope.floor[index].likes = $scope.floor[index].likes + 1;
      firebaseService.addLike($scope.floor[index].$id, $scope.floor[index].likes, id);
    }
  }
});