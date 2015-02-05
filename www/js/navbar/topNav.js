var app = angular.module('cs');

app.directive('navbar', function () {
    return {
        restrict: 'E',
        templateUrl: '../templates/top-nav.html',
        controller: 'NavbarController'
    }
});