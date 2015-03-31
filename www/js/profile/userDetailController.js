var app = angular.module('cs');

app.controller('UserDetailController', function ($scope, $state, firebaseService, $location, $ionicSideMenuDelegate, profileRef) {
    $scope.profile = profileRef;
    $scope.green = false;
    $scope.onTap = function () {
        $scope.green = true;
    };
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.editUser = function () {
        $state.go('secured.edit');
    };

    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

    $scope.addFriend = function () {
        // firebaseService.addFriend($scope.authInfo.uid, $stateParams.id, "sent", $scope.user.name, $scope.currentUser.name);
        // firebaseService.addFriend($stateParams.id, $scope.authInfo.uid, "received", $scope.currentUser.name);
    };
});
