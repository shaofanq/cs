var app = angular.module('cs');

app.controller('ValidationController', function ($scope, userRef, $state, db) {
    if (userRef) {
        $scope.auth = userRef.auth;
        $scope.user = userRef.user;
        $scope.posts = db.posts;
        $scope.users = db.users;
    } else {
        $state.go('login');
    }
});
