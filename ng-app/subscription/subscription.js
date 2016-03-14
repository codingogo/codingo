app.controller('SubscriptionsCtrl', function($scope, $stamplay, userStatus, $state){
  $scope.subscribeCard = function(card){
    var cardInfo = {
      number: card.number,
      cvc: card.cvc,
      exp_month: card.exp_month,
      exp_year: card.exp_year
    }
    // console.log('cardInfo',cardInfo);
    var user_id;
    userStatus.getUserModel().currentUser()
    .then(function(res){
      // console.log(res.user);
      user_id = res.user._id
      if(user_id){
        Stripe.card.createToken(cardInfo, function(status, response){
          if(response.error){
            console.log('error', response.error);
          } else {
            console.log('card token', response);
            var token = response.id;
            var cardId = response.card.id;
            var fingerprint = response.card.fingerprint;
            console.log('token', token);
            console.log('cardId', response);
            console.log('fingerprint', fingerprint);
            if(fingerprint === null){
              Stamplay.Stripe.createCreditCard(user_id, token)
              .then(function(returnCard){
                console.log('created card',returnCard)
                Stamplay.Stripe.createSubscription(user_id, 'monthly_subscription').then(function(res){
                  console.log('subscription',res);
                  $rootScope.subscription = res;
                }, function(err){
                  console.log(err);
                });                
              }, function(error){
                console.log(error);
              }) 
            } else {
              Stamplay.Stripe.createSubscription(user_id, 'monthly_subscription').then(function(res){
                console.log('subscription',res);
                $rootScope.subscription = res;
              }, function(err){
                console.log(err);
              })
            }
                  
          }
        })
      }
    }, function(err){
      console.log(err);
    });
   
    $state.go('home');
  }

});