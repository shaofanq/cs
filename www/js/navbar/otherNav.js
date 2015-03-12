var app = angular.module('cs');

app.directive('othernav', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/other-nav.html',
        controller: 'NavbarController'
    }
});