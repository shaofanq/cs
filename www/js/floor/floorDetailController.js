var app = angular.module('cs');

/* This controller was created to control the 
floor-detail.html view. It has much of the 
same functionality as the FloorController but
is able to use less logic since the data set
is more exact. */

app.controller('FloorDetailController', function($scope, $location, authService, $firebase, firebaseService, $stateParams, $ionicModal) {
  //get comments as separate resource for increased control
  $scope.comments = firebaseService.getComments($stateParams.id);
  $scope.currentPost = firebaseService.getFloorPost($stateParams.id);
  /* A function like hasOwnProperty but for values within an object. 
   Used for checking whether or not a comment / post is admired. */
  var hasVal = function(val) {
    for(var prop in this) {
      if(this.hasOwnProperty(prop) && this[prop] === val) {
        return true;   
      }
    }
    return false;
  };

  /*For getting the current post
  id is the id of the post, and shallow is a boolean
  which determines whether or not the post was admired
  directly before it was clicked on. */
  $scope.getFloorPost = function() {
    $scope.currentPost.$loaded().then(function() {
      if($stateParams.admired === "true" || $stateParams.shallow === "true") {
        $scope.admired = true;
      } else if($stateParams.admired === "false") {
        $scope.admired = false;
      }
    })
  }();

  /* Turn the comment into an object and pass it
  to the firebase service. also hide the modal
  and reset the form. */
  $scope.addComment = function(comment) {
    var count = 0;
    var id = $stateParams.id;
    comment = {
      text: comment,
      timestamp: Date.now(),
      likes: 0,
      user: $scope.user.name,
      admirers: [1] // if the array is empty firebase doesn't save it :(
    };
    count = $scope.currentPost.commentsCount + 1;
    firebaseService.addComment(id, comment, count);
    $scope.modal.hide();
    addCommentForm.reset();
  }

  /* Checks whether the current post has been
  liked by the current user using the hasVal
  function on the current posts array of admirers. */
  var isPostAdmired = function() {
    $scope.currentPost.$loaded(function() {
      $scope.currentPost.admirers.hasOwnValue = hasVal;
      if($scope.currentPost.admirers.hasOwnValue($scope.user.$id)) {
        $scope.currentPost.admired = true;
        $scope.admired = true;
      }
    });
  }();

  /* Checks whether a comment has been liked
  by looping through $scope.comments and
  using the hasVal function to determine
  if the current user's ID is found as an
  admirer of the comment. */
  var isCommentAdmired = function() {
    $scope.comments.$loaded(function() {
      for (var i = 0; i < $scope.comments.length; i++) {
        $scope.comments[i].admirers.hasOwnValue = hasVal;
        if($scope.comments[i].admirers.hasOwnValue($scope.user.$id)){
          $scope.comments[i].admired = true;
        }
      };
    });
  }();

  /* Allow user to like the current post only once
  by checking if $scope.admired === true, if it isn't
  it then likes the post and sets $scope.admired
  to true.*/
  $scope.like = function() {
    if(!$scope.admired){
      $scope.currentPost.likes++;
      firebaseService.addLike($scope.currentPost.$id, $scope.currentPost.likes, $scope.user.$id);
      $scope.admired = true;
    } 
  }

  /* Make it possible to like a comment, only once
  per user using the hasVal function. */
  $scope.commentLike = function(item, index) {
    item.admirers.hasOwnValue = hasVal;
    if(!item.admirers.hasOwnValue($scope.user.$id)) {
      var likes = item.likes + 1;
      firebaseService.addCommentLike(item.$id, likes, $stateParams.id, $scope.user.$id);
    }
  }

  // ionic modal settings
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
