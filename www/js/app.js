var app = angular.module('cs', ['ionic', 'firebase', 'ipCookie'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/explore");
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "../templates/main.html"
    })
    .state('notifications', {
      url: "/notifications",
      templateUrl: "../templates/notifications.html",
      controller: "UserDetailController"
    })
    .state('splash', {
      url: '/splash',
      templateUrl: '../templates/splash.html',
      controller: 'AuthController'
    })
    .state('register', {
      url: '/register',
      templateUrl: '../templates/register.html',
      controller: 'AuthController'
    })
    .state('fss', {
      url: '/fss',
      templateUrl: '../templates/fss.html',
      controller: 'UserController'
    })
    .state('typeInfo', {
      url: '/typeInfo',
      templateUrl: '../templates/typeInfo.html',
      controller: 'UserController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '../templates/login.html',
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
    })
    .state('messages', {
      url: '/messages',
      templateUrl: '../templates/messages.html',
      controller: 'messagesController'
    })
    .state('chat', {
      url: '/chat/:cid',
      templateUrl: '../templates/chat.html',
      controller: 'chatController'
    })
    .state('floor', {
        url: '/floor',
        templateUrl: '../templates/floor.html',
        controller: 'FloorController'      
    })
    .state('user-detail', {
        url: '/userDetail/:id',
        templateUrl: '../templates/user-detail.html',
        controller: 'UserDetailController'      
    });
});