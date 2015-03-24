var app = angular.module('cs');

app.controller('FloorDetailController', function($scope, $location, authService, $firebase, firebaseService, $stateParams, $ionicModal) {
  $scope.currentPost;
  $scope.admired;
  var getComments = function() {
    $scope.comments = $firebase(new Firebase('https://cancer.firebaseio.com/ean/floorPosts/' + $stateParams.id + '/comments')).$asArray(); 
  }();

  // like hasOwnProperty but for values
  var fn = function(val) {
      for(var prop in this) {
          if(this.hasOwnProperty(prop) && this[prop] === val) {
              return true;   
          }
      }
      return false;
  };

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
      user: $scope.user.name,
      admirers: [1]
    };
    count = $scope.currentPost.commentsCount + 1;
    firebaseService.addComment(id, comment, count);
    $scope.modal.hide();
    addCommentForm.reset();
    if ($scope.data) {$scope.data.message = "";};
  }

  var isPostAdmired = function() {
    $scope.currentPost.$loaded(function() {
      $scope.currentPost.admirers.hasOwnValue = fn;
      if($scope.currentPost.admirers.hasOwnValue($scope.user.$id)) {
        $scope.currentPost.admired = true;
        $scope.admired = true;
      }
    });
  }

  isPostAdmired();

  var isCommentAdmired = function() {
    $scope.comments.$loaded(function() {
      for (var i = 0; i < $scope.comments.length; i++) {
        $scope.comments[i].admirers.hasOwnValue = fn;
        if($scope.comments[i].admirers.hasOwnValue($scope.user.$id)){
          $scope.comments[i].admired = true;
          console.log('the ask',$scope.comments[i]);
        }
      };
          console.log('the answer', $scope.user.favorites.comments);

    });
  }();
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
    isPostAdmired();
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
