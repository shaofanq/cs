var app = angular.module('cs', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/main");
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
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '../templates/dashboard.html',
      controller: 'DashboardController'
    });
});