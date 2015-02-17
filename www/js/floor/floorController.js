var app = angular.module('cs');

app.controller('FloorController', function($scope, $location, authService, $firebase, firebaseService, $stateParams, $ionicModal) {
  $scope.post = {};
  $scope.currentPost;
  $scope.currentUser = authService.getCurrentUser();
  var id = $scope.currentUser.uid;
  $scope.getCurrentUser = function(){
    $scope.user = firebaseService.getUser(id);
  }();
  var floorRef = new Firebase('https://cancer.firebaseio.com/app/floorPosts');
  var sync = $firebase(floorRef);

  $scope.addPost = function() {
    var d = Date.now();
    $scope.post.timestamp = d;
    $scope.post.user = $scope.user.name;
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

  $scope.like = function(index) {
    var flag = true;
    for(key in $scope.user.favorites) {
      if($scope.user.favorites[key] === $scope.floor[index].$id) {
        flag = false;
      }
    };
    if(flag) {
      $scope.floor[index].likes = $scope.floor[index].likes + 1;
      firebaseService.addLike($scope.floor[index].$id, $scope.floor[index].likes, id);
    }
  }

  $scope.postDetails = function(index) {
    console.log(index);
    var id = $scope.floor[index].$id
    $location.path('floor-detail/' + id);
  }

  $scope.getFloorPost = function() {
    var id = $stateParams.id
    $scope.currentPost = firebaseService.getFloorPost(id);
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