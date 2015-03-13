var app = angular.module('cs');

app.controller('AuthController', function ($scope, authService, $location, ipCookie, $state) {

  $scope.login = function (user) {
    return authService.login(user, function(user){
        $state.go('secured.explore');
    });
  };

  $scope.register = function (user) {
    user.bio = '';
    user.friends = '';
    return authService.register(user, function(user){
      $scope.$apply(function(){
        $state.go('secured.fss');
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
