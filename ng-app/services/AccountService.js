app.factory('AccountService', function($q, $stamplay){
  var user = $stamplay.User().Model;
  return {
    login: function(){
      var q = $q.defer();
      user.login().then(function(){
        q.resolve(user.instance);
      })
      return q.promise;
    },
    logout: function(){
      var q = $q.defer();
      user.logout();
      return q.promise;
    },
    currentUser: function(){
      var q = $q.defer();
      user.currentUser().then(function(){
        q.resolve(user);
      })
      return q.promise;
    }
  }
});