var app = angular.module('cs');

app.controller('ExploreController', function ($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate, $state, $rootScope) {

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $rootScope.state = $state;

    $scope.isActive = function (a, b, c) {
        if (a === $location.path() || b === $location.path() || c === $location.path()) {
            return true;
        }
        return false;
    };

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.editUser = function () {
        $state.go('secured.edit');
    };

    $scope.users = firebaseService.getUsers();

    $scope.getProfile = function (user) {
        $state.go('secured.user-detail', { userId: user.uid });
    };

    $scope.notifications = function () {
        $state.go('secured.notifications');
    };

    $scope.goTo = function (id) {
        $state.go('secured.user-detail', { id: id });
    };

});
