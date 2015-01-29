var app = angular.module('cs');

app.controller('AuthController', function ($scope, authService, $location, ipCookie) {
  
  $scope.login = function (user) {
    return authService.login(user, function(user){
      console.log('ean look over here!', user)
      $scope.$apply(function(){
        $location.path('/explore/' + user.uid)
      });
    });
  };

  $scope.register = function (user) {
    user.bio = '';
    return authService.register(user, function(user){
      user.uid = user.uid.replace('simplelogin:', '');
      $scope.$apply(function(){
        $location.path('/edit')
      });
    });
  };
  
  $scope.status = 'Register';
  $scope.showReg = function(){
    if($scope.status === 'Register'){
      $scope.status = 'Login';  
    } else {
      $scope.status = 'Register';
    }
    $scope.reg = !$scope.reg;
  };


});