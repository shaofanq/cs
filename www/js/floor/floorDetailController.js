var app = angular.module('cs');

/* This controller was created to control the 
floor-detail.html view. It has much of the 
same functionality as the FloorController but
is able to use less logic since the data set
is more exact. */

app.controller('FloorDetailController', function ($scope, $location, authService, $firebase, firebaseService, $stateParams, $ionicModal, floorService) {
    //get comments as separate resource for increased control
    $scope.comments = firebaseService.getComments($stateParams.id);
    $scope.currentPost = firebaseService.getFloorPost($stateParams.id);

    function ready() {
        var favoritePosts = $scope.user.favorites.posts;

        function postLiked() {
            if (favoritePosts.hasOwnProperty($scope.currentPost.$id)) {
                $scope.admired = true;
            }
        };
        postLiked();
    }

// <<<<<<< HEAD
//   /*For getting the current post
//   id is the id of the post, and shallow is a boolean
//   which determines whether or not the post was admired
//   directly before it was clicked on. */
//   var isAdmired = function() {
//     $scope.currentPost.$loaded().then(function() {
//       if($stateParams.admired === "true" || $stateParams.shallow === "true") {
//         $scope.admired = true;
//       } else if($stateParams.admired === "false") {
//         $scope.admired = false;
//       }
//     })
//   }();
// =======
    //called by ng-init on the comments ng-repeat
    $scope.checkFavs = function (item, i) {
        if ($scope.user.favorites.comments.hasOwnProperty(item.$id)) {
            item.admired = true;
        }
        if ($scope.user.flags.hasOwnProperty(item.$id)) {
            item.flaggedText = "Flagged for review";
            item.flagged = true;
            item.hideFlagged = true;
        };
    }

    $scope.toggleFlagged = function (item) {
        item.hideFlagged = !item.hideFlagged;
    }


    /* Turn the comment into an object and pass it
    to the firebase service. also hide the modal
    and reset the form. */
    $scope.addComment = function () {
        var count = 0;
        var id = $stateParams.id;
        var comment = {
            text: $scope.currentPost.commentText,
            timestamp: Date.now(),
            likes: 0,
            user: $scope.user.name,
            admirers: [1] // if the array is empty firebase doesn't save it :(
        };
        count = $scope.currentPost.commentsCount + 1;
        firebaseService.addComment(id, comment, count);
        $scope.modal.hide();
        addCommentForm.reset();
    };

    $scope.likePost = function () {
        $scope.admired = true;
        return floorService.likePost($scope.user, $scope.currentPost);
    }

    $scope.likeComment = function (comment) {
        comment.admired = true;
        return floorService.likeComment($scope.user, comment, $scope.comments);
    }

    $scope.flagPost = function () {
        floorService.flagItem(user, $scope.post, 'hide');
    }

    $scope.flagComment = function (comment, i) {
        comment.flaggedText = 'Flagged for review';
        comment.flagged = true;
        comment.hideFlagged = true;
        floorService.flagItem($scope.user, comment, 'hide', $scope.comments);
    }
    $scope.removeFlag = function (comment) {
        comment.flaggedText = '';
        comment.flagged = false;
        comment.hideFlagged = false;
        floorService.removeFlag($scope.user, comment, $scope.comments);
    }


    // ionic modal settings
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    }

    $scope.user.$loaded(function () {
        ready();
    });
});
