var app = angular.module('cs');

app.controller('UserController', function($scope, firebaseService, authService, ipCookie, $firebase, $location, $state) {

    $scope.addData = function(user) {
      sync.$update({
        bio: user.bio,
        cancer: user.cancer,
        name: user.name,
        level: user.level
      });
      $state.go('secured.explore');
    };

    $scope.fss = function(item, link){
        sync.$update({
          level: item,
        });
        $state.go(link);
    };

    $scope.myImage='';
       $scope.myCroppedImage='';

       var handleFileSelect=function(evt) {
         var file=evt.currentTarget.files[0];
         var reader = new FileReader();
         reader.onload = function (evt) {
           $scope.$apply(function($scope){
             $scope.myImage=evt.target.result;
           });
         };
         reader.readAsDataURL(file);
       };
       angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
       $scope.saveImage = function(pic) {
         sync.$update({
           profilePic: pic
         });
       };
});
