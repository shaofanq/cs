var app = angular.module('starter', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "../templates/main.html",
    })
    .state('other', {
      url: "/other",
      templateUrl: "../templates/other.html",
    })
    .state('login', {
      url: '/login',
      templateUrl: '../templates/login.html',
    })
    .state('register', {
      url: '/register',
      templateUrl: '../templates/register.html',
    });
});