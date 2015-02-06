var app = angular.module('cs');

app.controller('AuthController', function ($scope, authService, $location, ipCookie, $state) {
  
  $scope.login = function (user) {
    return authService.login(user, function(user){
      $scope.$apply(function(){
        $state.go('explore', {}, {reload: true})
      });
    });
  };

  $scope.register = function (user) {
    user.bio = '';
    return authService.register(user, function(user){
      $scope.$apply(function(){
        $location.path('/fss', {}, {reload: true})
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