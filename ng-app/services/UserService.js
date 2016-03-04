app
.factory('User', function ($stamplay, $q, $http) {
    var user = {};
    // return an object with all our functions
    return {
      getCurrent: function() {
        
        // var def = $q.defer();

        // // instantiate a new user model from the stamplay js sdk
        // var user = new Stamplay.User().Model;
        // console.log(user);
        // user.currentUser()
        //     .then(function() {
        //         // send the entire user model back
        //         def.resolve(user);
        //     });

        // return def.promise;
      },
      signup: function(data) {
        var def = $q.defer();

        // instantiate a new user model from the stamplay js sdk
        var user = new Stamplay.User().Model;
        user.signup(data)
            .then(function() {
                // send the entire user model back
                def.resolve(user);
            })

        return def.promise;
      },
      login: function(data) {
        var def = $q.defer();

        var user = new Stamplay.User().Model;
        user.login(data)
            .then(function() {
                // send the entire user model back
                def.resolve(user);
            }, function() {
                def.reject({ 'error': 'Unable to login user.' });
            });

        return def.promise;
      },
      logout: function() {
        // return Stamplay.User.logout();
        console.log('checking');
      },
      getUserModel: function(){
        return Stamplay.User;
      }
    };

    /**
     * Get the current logged in user
     */

    /**
     * Register a user with their name, email, and password
     */


    /**
     * Log a user in with their email and password
     */


    /**
     * Log the current user out
     * Will also redirect the browser to the logout url (home)
     */


});