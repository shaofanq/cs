var app = angular.module('cs');

app.controller('ValidationController', function ($scope, userRef, $state) {
    if (userRef) {
        $scope.auth = userRef.auth;
        $scope.user = userRef.user;
    } else {
        $state.go('login');
    }
});
