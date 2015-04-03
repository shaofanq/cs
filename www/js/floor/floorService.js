var app = angular.module('cs');

/* Centralized service to handle 
 * actions from multiple views 
 * related to the floor */

app.factory('floorService', function () {
    return {
        likePost: function (user, post, posts) {
            user.favorites = user.favorites || {posts: { }, comments : {}}
            if (!user.favorites.posts.hasOwnProperty(post.$id)) {
                post.likes++;
                post.admirers[user.$id] = user.$id;
                user.favorites.posts[post.$id] = post.$id;
                user.$save();
                if (!posts) {
                    post.$save();
                } else {
                    posts.$save(post);
                }
            }
            return true;
        },
        likeComment: function (user, comment, comments) {
            user.favorites = user.favorites || { posts: {}, comments : {} }
            if (!user.favorites.comments.hasOwnProperty(comment.$id)) {
                comment.likes++;
                comment.admirers[user.$id] = user.$id;
                user.favorites.comments[comment.$id] = comment.$id;
                user.$save();
                comments.$save(comment);
            }
            return true;
        },
        flagItem: function (user, item, flag, itemArray) {
            item.flags = item.flags || {};
            user.flags = user.flags || {};
            user.flags[item.$id] = flag;
            user.$save();
            item.flags[user.$id] = flag;
            if (!itemArray) {
                item.$save();
            } else {
                itemArray.$save(item);
            }
            return true;
        },
        removeFlag: function(user, item, itemArray) {
            delete item.flags[user.$id];
            delete user.flags[item.$id];
            user.$save();
            if (!itemArray) {
                item.$save();
            } else {
                itemArray.$save(item);
            }
            return true;
        }

    };
});