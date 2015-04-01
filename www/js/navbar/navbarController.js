var app = angular.module('cs');

app.controller('NavbarController', function ($scope, $ionicHistory, $state, authService) {
    if ($state.current.name) {
        var title = $state.current.name.replace('secured.', '');
        $scope.title = title.toUpperCase();
    }
    $scope.goBack = function () {
        if ($ionicHistory.backView.name) {
            $ionicHistory.goBack();
        } else {
            $state.go('secured.explore');
        }
    }
    $scope.toggleSearch = function () {
        $scope.search = !$scope.search;
    }
    
    $scope.logout = function () {
        authService.logout();
        $state.go('splash');
    };

});
