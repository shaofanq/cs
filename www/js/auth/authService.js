var app = angular.module('cs');

app.service('authService', function(){
  //Just a reference to the firebase endpoint
  var firebaseUrl = 'https://cancer.firebaseio.com/ean'
  //Creates an object using the Firebase Constructor with our endpoint passed in
  var firebaseLogin = new Firebase(firebaseUrl);

  //login method to be called from our controller. The callback is then passed the authenticated user

  this.login = function(user, cb){
    firebaseLogin.authWithPassword({
      email    : user.email,    //Email and Password come from our login form
      password : user.password
    }, function(err, authData) {
      if (err) {
        switch (err.code) {
          case "INVALID_EMAIL":
              // handle an invalid email
              case "INVALID_PASSWORD":
              // handle an invalid password
              default:
          }
      } else if (authData) {
          // user authenticated with Firebase
          cb(authData); //gives the authenticated user to our callback
      }
    });
  }

  this.register = function(user, cb){
    firebaseLogin.createUser({
      email: user.email,
      password: user.password,
      bio: ''
    }, function(error) {
      if (error === null) {
        firebaseLogin.authWithPassword({
            email    : user.email,
            password : user.password
          }, function(err, authData) {
          if (authData) {
            authData.name = user.name;
            authData.bio = '';
            authData.cancer = '';
            authData.level = '';
            authData.friends = '';
            authData.timestamp = new Date().toISOString();
            firebaseLogin.child('users').child(authData.uid).set(authData);
            cb(authData);
          } else {
          }
        });
      } else {
        return false;
      }
    });
  }

  this.getCurrentUser = function() {
    return firebaseLogin.getAuth();
  }

    this.logout = function() {
    firebaseLogin.unauth();
  }












});
