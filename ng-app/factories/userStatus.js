/*
This Factory is in charge of tracking user status via the **User** `getStatus`
API call and expose it to controllers who require it.
It acts as a simple caching layer between user status and controllers
Whenever one or more controller on the same page are in need to know
the user status the API call would be effectively done only one time
*/
app.factory('userStatus', ['$http','$stamplay', '$rootScope',function ($http, $stamplay, $rootScope) {

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
      // var user = {};

      // Stamplay.User.currentUser().then(function(res){
      //   user = res.user;

      //   if(user.verificationCode){
      //     if(user.stripeCustomerId === undefined){
      //       // Create Stripe Customer           
      //       Stamplay.Stripe.createCustomer('', user._id)
      //       .then(function(resData){
      //         var userData = {
      //           'stripeCustomerId': resData.customer_id,
      //           'subscriptions': resData.subscriptions
      //         };
      //         Stamplay.User.update(user._id, userData);
      //       }, function(err){
      //         console.log(err);
      //       })
      //     };
      //   };

      // })
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
    createCard: function(user_id, cardObj){
      // Collect credit card information and store it via Stripe
      console.log(cardObj);
      console.log(user_id);
      // return Stamplay.Stripe.createCreditCard(user_id, cardObj);
    },
    subscribe: function(planId){
      // Subscribe user
    },
    unsubscribe: function(planId){
      // Cancel user subscription
    }
  };
}])