var app = angular.module('cs', ['ionic', 'firebase', 'ipCookie'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/explore");
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "../templates/main.html"
    })
    .state('login', {
      url: '/login',
      templateUrl: '../templates/login.html',
      controller: 'AuthController'
    })
    .state('register', {
      url: '/register',
      templateUrl: '../templates/register.html',
      controller: 'AuthController'
    })
    .state('explore', {
      url: '/explore',
      templateUrl: '../templates/explore.html',
      controller: 'ExploreController'
    })
    .state('edit-user', {
      url: '/edit',
      templateUrl: '../templates/edit-user.html',
      controller: 'UserController'
    });
});