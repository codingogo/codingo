app.factory('userStatus', ['$http','$stamplay', '$rootScope','$q',function ($http, $stamplay, $rootScope, $q) {

  var user = {};
  var user_id = user._id;

  return {
    loginUser: function (data) {
      return Stamplay.User.login(data);
    },
    registerUser: function (data) {
      return Stamplay.User.signup(data);
    },
    logout: function(){
      return Stamplay.User.logout()
    },
    getUserModel: function () {
      return Stamplay.User;
    },    

    // Getter and Setter method
    getUser: function () {
      return user
    },
    setUser: function (displayName, picture, _id, email, logged) {
      user = {
        displayName: displayName,
        picture: picture,
        _id: _id,
        email: email,
        logged: logged
      }
    },
    getCard: function(user_id){
      // var user_id = user._id;
      return Stamplay.Stripe.getCreditCard(user_id)
              .then(function(res){
                return res;
              }, function(err){
                console.log(err);
              })
    },
    subscribe: function(user_id, planId){
      return Stamplay.Stripe.createSubscription(user_id, planId)
              .then(function(res){
                console.log('subscription', res);
                $rootScope.subscription = res;
                return res;
              }, function(err){
                console.log(err);
              })
    },
    unsubscribe: function(planId){
      // Cancel user subscription
    }
  };
}])