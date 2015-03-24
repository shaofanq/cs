var app = angular.module('cs');

app.controller('FloorController', function($scope, $location, authService, $firebase, firebaseService, $stateParams, $ionicModal) {
  $scope.post = {};
  $scope.currentPost;
  $scope.favoritePosts = firebaseService.getFavoritePosts($scope.user.$id);
  var floorRef = new Firebase('https://cancer.firebaseio.com/ean/floorPosts');
  var sync = $firebase(floorRef);

  $scope.addPost = function() {
    $scope.post.timestamp = Date.now();
    $scope.post.user = $scope.user.name;
    $scope.post.profilePic = $scope.user.profilePic;
    $scope.post.likes = 0;
    $scope.post.comments = [];
    $scope.post.commentsCount = 0;
    $scope.post.admirers = ['1'];
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

    $scope.checkFavs = function(item) {
      var arr = $scope.favoritePosts;
      for (var i = 0; i < arr.length; i++) {
        if(item.$id === arr[i].$value) {
          item.admired = true;
        }
      }
    }

  $scope.postDetails = function(index, admired, shallowAdmired) {
    if (shallowAdmired) {
      var shallow = true;
    } else {
      var shallow = false;
    }
    var id = $scope.floor[index].$id;
    if(admired) {
      admired = true;
    } else {
      admired = false;
    }
    var admired = admired;
    $location.path('detail/' + id + '+' + admired + '+' + shallow);
  }

  $scope.getFloorPost = function() {
    var id = $stateParams.id;
    var shallow = $stateParams.shallow;
    $scope.currentPost = firebaseService.getFloorPost(id);
    $scope.currentPost.$loaded().then(function() {
      $scope.currentPost.comments = firebaseService.getCurrentComments($scope.currentPost.$id);
      if($stateParams.admired === "true" || shallow === "true") {
        $scope.currentPost.admired = true;
      } else if($stateParams.admired === "false") {
        $scope.currentPost.admired = false;
      }
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

  $scope.like = function(item, index) {
    var index;
    for (var i = 0; i < $scope.floor.length; i++) {
      if($scope.floor[i].$id === item.$id) {
        index = i
      }
    }
    if($scope.user.favorites) {
      var flag = true;
      $scope.floor[index].admired = true;
      for(key in $scope.user.favorites.posts) {
        if($scope.user.favorites.posts[key] === item.$id) {
          flag = false;
        }
      };
      if(flag) {
        $scope.floor[index].likes = $scope.floor[index].likes + 1;
        firebaseService.addLike($scope.floor[index].$id, $scope.floor[index].likes, $scope.user.$id);
      }
    } else {
      $scope.floor[index].likes = $scope.floor[index].likes + 1;
      firebaseService.addLike($scope.floor[index].$id, $scope.floor[index].likes, $scope.user.$id);
    }
    $scope.floor[index].admired = true;
  }

  // make it possible to like a comment, only once per user
  $scope.commentLike = function(item, index) {
    var user = $scope.user;
    var post = $scope.currentPost;
    if(user.favorites) {
      var flag = true;
      for(key in user.favorites.comments) {
        if(user.favorites.comments[key] === item.$id) {
          flag = false;
        }
      }
      if(flag) {
        var likes = item.likes + 1;
        firebaseService.addCommentLike(item.$id, likes, $stateParams.id, user.$id);
      }
    } else {
      var likes = item.likes + 1;
      firebaseService.addCommentLike(item.$id, likes, $stateParams.id, user.$id);
    }
  }

    /////////////////
   // MODAL SHIT //
  ///////////////
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
