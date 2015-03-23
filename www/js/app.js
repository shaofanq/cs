var app = angular.module('cs', ['ionic', 'firebase', 'ipCookie', 'ngImgCrop', 'truncate','angularMoment']);

app.run(function(amMoment) {
    amMoment.changeLocale('de');
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.transition('none');
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "templates/main.html"
    })
    .state('splash', {
      url: '/splash',
      templateUrl: 'templates/splash.html',
      controller: 'AuthController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'AuthController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'AuthController'
    })
        ////////////////
       //  SECURED   //
      ////////////////
    .state('secured', {
      abstract: true,
      controller: 'ValidationController',
      template: '<ion-nav-view></ion-nav-view>',
      resolve: {
        userRef: function(authService, firebaseService){
          var auth = authService.getCurrentUser();
          var user = firebaseService.getUser(auth.uid);
          return {
              auth: auth,
              user: user
          }
        }
      }
    })
      ////////////////
     // ONBOARDING //
    ////////////////

    .state('secured.fss', {
      url: '/fss',
      templateUrl: 'templates/fss.html',
      controller: 'UserController'
    })
    .state('secured.type-fighter', {
      url: '/type-fighter',
      templateUrl: '../templates/type-fighter.html',
      controller: 'UserController'
    })
    .state('secured.type-survivor', {
      url: '/type-survivor',
      templateUrl: '../templates/type-survivor.html',
      controller: 'UserController'
    })
    .state('secured.type-supporter', {
      url: '/type-supporter',
      templateUrl: '../templates/type-supporter.html',
      controller: 'UserController'
    })
    .state('secured.bio-info', {
      url: '/bio-info',
      templateUrl: '../templates/bio-info.html',
      controller: 'UserController'
    })

     ////////////////////////////////
    // EXPLORE / FLOOR / MESSAGES //
   ////////////////////////////////
    .state('secured.explore', {
      url: '/explore',
      templateUrl: 'templates/explore.html',
      controller: 'ExploreController'
    })
    .state('secured.messages', {
      url: '/messages',
      templateUrl: 'templates/messages.html',
      controller: 'messagesController'
    })
    .state('secured.chat', {
      url: '/chat/:cid',
      templateUrl: 'templates/chat.html',
      controller: 'chatController',
      resolve: {
        chatsRef: function(chatService, $state){
          return chatService.getChat($state.params.cid);
        }
      }
    })
    .state('secured.floor', {
        url: '/floor',
        templateUrl: 'templates/floor.html',
        controller: 'FloorController'
    })
     ////////////////////////
    // PROFILES / FRIENDS //
   ////////////////////////
    .state('secured.user-detail', {
        url: '/userDetail/:id',
        templateUrl: 'templates/user-detail.html',
        controller: 'UserDetailController'
    })
    .state('secured.edit-user', {
      url: '/edit',
      templateUrl: 'templates/edit-user.html',
      controller: 'UserController'
    })
    .state('secured.notifications', {
      url: "/notifications",
      templateUrl: "templates/notifications.html",
      controller: "notificationsController"
    })
    .state('secured.friends', {
      url: "/friends",
      templateUrl: "templates/friends.html",
      controller: "notificationsController"
    })
    .state('secured.detail', {
      url: "/detail/:id+:admired+:shallow",
      templateUrl: "templates/floor-detail.html",
      controller: "FloorController"
    });
    $urlRouterProvider.otherwise("/splash");
});
