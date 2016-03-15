app.controller('SubscriptionsCtrl', function($scope, $stamplay, userStatus, $state){
  $scope.subscribeCard = function(card){
    var cardInfo = {
      number: card.number,
      cvc: card.cvc,
      exp_month: card.exp_month,
      exp_year: card.exp_year
    }
    var user_id = userStatus.getUser()._id;
    console.log(user_id);
    userStatus.createCard(cardInfo);
    // console.log(Stamplay.Stripe);
    // var create_card = Stripe.card.createToken(cardInfo, function(status, response){
    //   if(response.error){
    //     console.log('err', response.error);
    //   } else {
    //     var token = response.id;
    //     var cardId = response.card.id;
    //     Stamplay.Stripe.createCreditCard(user_id, token)
    //     .then(function(returnCard){
    //       console.log('card', returnCard);
    //     }, function(err){
    //       console.log(err);
    //     })
    //   }
    // })

    // console.log('cardInfo',cardInfo);
    // var user_id;
    // userStatus.getUserModel().currentUser()
    // .then(function(res){
    //   // console.log(res.user);
    //   user_id = res.user._id
    //   if(user_id){
    //     Stripe.card.createToken(cardInfo, function(status, response){
    //       if(response.error){
    //         console.log('error', response.error);
    //       } else {
    //         console.log('card token', response);
    //         var token = response.id;
    //         var cardId = response.card.id;

    //         if(fingerprint === null){
    //           Stamplay.Stripe.createCreditCard(user_id, token)
    //           .then(function(returnCard){
    //             console.log('created card',returnCard)
    //           }, function(error){
    //             console.log(error);
    //           }) 
    //         } else {
    //           Stamplay.Stripe.createSubscription(user_id, 'monthly_subscription').then(function(res){
    //             console.log('subscription',res);
    //             $rootScope.subscription = res;
    //           }, function(err){
    //             console.log(err);
    //           })
    //         }
                  
    //       }
    //     })
    //   }
    // }, function(err){
    //   console.log(err);
    // });
   
    // $state.go('home');
  }

});