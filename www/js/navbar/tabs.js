var app = angular.module('cs');

app.directive('tabs', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/tabs.html',
        controller: 'NavbarController'
    }
});