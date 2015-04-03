var app = angular.module('cs');

app.factory('db', function () {
    var firebaseUrl = 'https://cancer.firebaseio.com/ean/';
    var db = {
        main: new Firebase(firebaseUrl),
        users: new Firebase(firebaseUrl + 'users/'),
        posts: new Firebase(firebaseUrl + 'floorPosts/')
    }

    db.users.on('child_added', function (snapshot) {
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    db.users.once("value", function (snapshot) {
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    db.posts.on('child_added', function (snapshot) {
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    db.posts.once("value", function (snapshot) {
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    return db;
});
