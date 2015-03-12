var app = angular.module('cs', ['ionic', 'firebase', 'ipCookie', 'ngImgCrop'])

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.transition('none');
  $urlRouterProvider.otherwise("/explore");
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "../templates/main.html"
    })
 

     ////////////////
    // ONBOARDING //
   ////////////////
   
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
    .state('type-fighter', {
      url: '/type-fighter',
      templateUrl: '../templates/type-fighter.html',
      controller: 'UserController'
    })
    .state('type-survivor', {
      url: '/type-survivor',
      templateUrl: '../templates/type-survivor.html',
      controller: 'UserController'
    })
    .state('type-supporter', {
      url: '/type-supporter',
      templateUrl: '../templates/type-supporter.html',
      controller: 'UserController'
    })
    .state('bio-info', {
      url: '/bio-info',
      templateUrl: '../templates/bio-info.html',
      controller: 'UserController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '../templates/login.html',
      controller: 'AuthController'
    })


     ////////////////////////////////
    // EXPLORE / FLOOR / MESSAGES //
   ////////////////////////////////
    .state('explore', {
      url: '/explore',
      templateUrl: '../templates/explore.html',
      controller: 'ExploreController'
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


     ////////////////////////
    // PROFILES / FRIENDS //
   ////////////////////////
    .state('user-detail', {
        url: '/userDetail/:id',
        templateUrl: '../templates/user-detail.html',
        controller: 'UserDetailController'
    })
    .state('edit-user', {
      url: '/edit',
      templateUrl: '../templates/edit-user.html',
      controller: 'UserController'
    })
    .state('notifications', {
      url: "/notifications",
      templateUrl: "../templates/notifications.html",
      controller: "notificationsController"
    })
    .state('friends', {
      url: "/friends",
      templateUrl: "../templates/friends.html",
      controller: "notificationsController"
    })
    .state('floor-detail', {
      url: "/floor-detail/:id",
      templateUrl: "../templates/floor-detail.html",
      controller: "FloorController"
    });

});
