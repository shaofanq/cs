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
    sync.$push($scope.post);
    $scope.post = {};
  }


    $scope.floor = firebaseService.getFloor();


});