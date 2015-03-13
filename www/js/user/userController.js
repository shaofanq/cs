var app = angular.module('cs');

app.controller('UserController', function($scope, firebaseService, authService, ipCookie, $firebase, $location, $state) {
    $scope.user = authService.getCurrentUser();
    var userRef = new Firebase('https://cancer.firebaseio.com/ean/users/' + $scope.user.uid);
    var sync = $firebase(userRef);

    $scope.userData = sync.$asObject();

    $scope.addData = function(user) {
      sync.$update({
        cancer: user.cancer,
        name: user.name,
        level: user.level
      });
      $location.path('/bio-info');
    };

    $scope.addSurvivor = function(user) {
      sync.$update({
        cancer: user.cancer,
        name: user.name,
        level: user.level,
        yot: user.yot
      });
      $location.path('/bio-info');
    };

    $scope.addSupporter = function(user) {
      sync.$update({
        cancer: user.cancer,
        name: user.name,
        level: user.level,
        supType: user.supType
      });
      $location.path('/bio-info');
    };

    $scope.addBioInfo = function(user) {
      sync.$update({
        bio: user.bio,
        age: user.age,
        local: user.local
      });
      $location.path('/explore');
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
