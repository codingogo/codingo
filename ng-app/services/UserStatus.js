app.factory('UserStatus', ['$http','$stamplay', '$rootScope','$q',function ($http, $stamplay, $rootScope, $q) {

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
      return Stamplay.User.logout();
    },
    getUserModel: function () {
      return Stamplay.User;
    },    

    // Getter and Setter method
    getUser: function () {
      return Stamplay.User.currentUser();
    },
    updateUser: function (user_id, data) {
      return Stamplay.User.update(user_id, data);
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
    deleteUser: function(user_id){
      return Stamplay.User.remove(user_id);
    },
    // card and subscription
    createCard: function(user_id, token){
      return Stamplay.Stripe.createCreditCard(user_id, token);
    },
    getCard: function(user_id){
      return Stamplay.Stripe.getCreditCard(user_id);
    },
    getSubscriptions: function(user_id, options){
      return Stamplay.Stripe.getSubscriptions(user_id, options);
    },
    subscribe: function(user_id, planId){
      return Stamplay.Stripe.createSubscription(user_id, planId);
    },
    unsubscribe: function(user_id, subscriptionId, options){
      return Stamplay.Stripe.deleteSubscription(user_id, subscriptionId, options);
    }
  };
}])