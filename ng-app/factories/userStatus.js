app.factory('userStatus', ['$http','$stamplay', '$rootScope','$q',function ($http, $stamplay, $rootScope, $q) {

  var user = {};

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
    // Subscription Section
    createCard: function(cardInfo){
    return Stripe.card.createToken(cardInfo, function(status, response){
        if(response.error){
          console.log('err', response.error);
        } else {
          var token = response.id;
          var cardId = response.card.id;
          var user_id = user._id;
          Stamplay.Stripe.createCreditCard(user_id, token)
          .then(function(returnCard){
            console.log('card', returnCard);
          }, function(err){
            console.log(err);
          })
        }
      })
    },
    subscribe: function(planId){
      // Subscribe user
    },
    unsubscribe: function(planId){
      // Cancel user subscription
    }
  };
}])