var app = angular.module('cs');

app.controller('FloorController', function($scope, $location, authService, $firebase, firebaseService, $stateParams, $ionicModal) {
  $scope.post = {};
  $scope.currentPost;
  $scope.currentUser = authService.getCurrentUser();
  var id = $scope.currentUser.uid;
  $scope.getCurrentUser = function(){
    $scope.user = firebaseService.getUser(id);
  }();
  var floorRef = new Firebase('https://cancer.firebaseio.com/ean/floorPosts');
  var sync = $firebase(floorRef);

  $scope.addPost = function() {
    $scope.post.timestamp = Date.now();
    $scope.post.user = $scope.user.name;
    $scope.post.profilePic = $scope.user.profilePic;
    $scope.post.likes = 0;
    $scope.post.comments = [];
    $scope.post.commentsCount = 0;
    sync.$push($scope.post);
    $scope.post = {};
    $scope.modal.hide();

  }
    $scope.isActive = function(a,b,c) {
        if(a === $location.path() || b === $location.path() || c === $location.path()) {
          return true
        }
    }

    $scope.floor = firebaseService.getFloor();


  $scope.postDetails = function(index) {
    var id = $scope.floor[index].$id
    $location.path('floor-detail/' + id);
  }

  $scope.getFloorPost = function() {
    var id = $stateParams.id
    $scope.currentPost = firebaseService.getFloorPost(id);
    $scope.currentPost.$loaded().then(function() {
      $scope.currentPost.comments = firebaseService.getCurrentComments($scope.currentPost.$id);
    })
  }();

  $scope.addComment = function(comment) {
    var count = 0;
    var id = $stateParams.id;
    comment = {
      text: comment,
      timestamp: Date.now(),
      likes: 0,
      user: $scope.user.name
    };
    for (var i = 0; i < $scope.floor.length; i++) {
      if($scope.floor[i].$id === id) {
        count = $scope.floor[i].commentsCount + 1;
      }
    };
    firebaseService.addComment(id, comment, count);
    $scope.modal.hide();
    addCommentForm.reset();
    if ($scope.data) {$scope.data.message = "";};
  }


  $scope.like = function(index) {
    if($scope.user.favorites) {
      var flag = true;
      for(key in $scope.user.favorites.posts) {
        if($scope.user.favorites.posts[key] === $scope.floor[index].$id) {
          flag = false;
        }
      };
      if(flag) {
        $scope.floor[index].likes = $scope.floor[index].likes + 1;
        firebaseService.addLike($scope.floor[index].$id, $scope.floor[index].likes, id);
      }
    } else {
      $scope.floor[index].likes = $scope.floor[index].likes + 1;
      firebaseService.addLike($scope.floor[index].$id, $scope.floor[index].likes, id);
    }

  }

  $scope.commentLike = function(index) {

    var flag = true;
    for(key in $scope.user.favorites.comments) {
      if($scope.user.favorites.comments[key] === $scope.currentPost.comments[index].$id) {
        flag = false;
      }
    };
    if(flag) {
      $scope.currentPost.comments[index].likes = $scope.currentPost.comments[index].likes + 1;
      firebaseService.addCommentLike($stateParams.id, $scope.currentPost.comments[index].likes, $scope.currentPost.$id, id)
    }
  }

    /////////////////
   // MODAL SHIT ///
  /////////////////
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  }


});
