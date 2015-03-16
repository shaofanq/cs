var app = angular.module('cs');

app.directive('sideNav', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/side-nav.html',
    controller: 'ExploreController'
  }
});
