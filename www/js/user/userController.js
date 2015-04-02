var app = angular.module('cs');

app.controller('UserController', function($scope, firebaseService, authService, ipCookie, $firebase, $location, $state) {
    var sync = $scope.user;
    $scope.addData = function(user) {
      sync.$save({
        cancer: user.cancer,
        name: user.name,
        level: user.level
      });
      $state.go('secured.explore');
    };

    $scope.fss = function(item, link){
        sync.$save({
          level: item
        });
        $state.go('secured.bio-info');
    };

    $scope.addSurvivor = function(user) {
      sync.$save({
        cancer: user.cancer,
        name: user.name,
        level: user.level,
        yot: user.yot
      });
        $state.go('secured.bio-info');
    };

    $scope.addSupporter = function(user) {
      sync.$save({
        cancer: user.cancer,
        name: user.name,
        level: user.level,
        supType: user.supType
      });
        $state.go('secured.bio-info');
    };

    $scope.addBioInfo = function(user) {
      sync.$save({
        bio: user.bio,
        age: user.age,
        local: user.local
      });
        $state.go('secured.explore');
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
