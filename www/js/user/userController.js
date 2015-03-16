var app = angular.module('cs');

app.controller('UserController', function($scope, firebaseService, authService, ipCookie, $firebase, $location, $state) {

    $scope.addData = function(user) {
      sync.$update({
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
        $state.go('secure.bio-info');
    };

    $scope.addSurvivor = function(user) {
      sync.$update({
        cancer: user.cancer,
        name: user.name,
        level: user.level,
        yot: user.yot
      });
        $state.go('secure.bio-info');
    };

    $scope.addSupporter = function(user) {
      sync.$update({
        cancer: user.cancer,
        name: user.name,
        level: user.level,
        supType: user.supType
      });
        $state.go('secure.bio-info');
    };

    $scope.addBioInfo = function(user) {
      sync.$update({
        bio: user.bio,
        age: user.age,
        local: user.local
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
