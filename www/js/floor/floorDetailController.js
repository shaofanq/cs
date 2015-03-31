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

    $scope.checkFavs = function (item) {
        for (var i = 0; i < $scope.user.favorites.comments.length; i++) {
            if (item.$id === arr[i].$value) {
                item.admired = true;
            }
        }
    }

    /* Turn the comment into an object and pass it
    to the firebase service. also hide the modal
    and reset the form. */
    $scope.addComment = function (comment) {
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
    };

    $scope.likePost = function () {
        $scope.admired = true;
        return floorService.likePost($scope.user, $scope.currentPost);
    }

    $scope.likeComment = function (comment) {
        comment.admired = true;
        return floorService.likeComment($scope.user, comment, $scope.comments);
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
