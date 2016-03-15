app.controller('SubscriptionsCtrl', function($scope, $stamplay, userStatus, $state){
  $scope.subscribeMembership = function(card){
    var cardInfo = {
      number: card.number,
      cvc: card.cvc,
      exp_month: card.exp_month,
      exp_year: card.exp_year
    }
    var user_id = userStatus.getUser()._id;
    // check credit card   
    userStatus.getCard(user_id).then(function(res){
      // card doesn't exist      
      if(res.fingerprint === undefined){        
        // create credit card          
        Stripe.card.createToken(cardInfo, function(status, response){
          if(response.error){
            console.log('err', response.error)
          } else {
            var token = response.id;
            var cardId = response.card.id;

            Stamplay.Stripe.createCreditCard(user_id, token)
            .then(function(returnCard){
              // create subscription
              userStatus.subscribe(user_id, 'monthly_subscription')
              .then(function(res){
                $rootScope.subscription = res;
              }, function(err){
                console.log(err);
              })              
            })
          }
        })        
      // card exist        
      } else {
        // created subscription
        userStatus.subscribe(user_id, 'monthly_subscription')
        .then(function(res){
          $rootScope.subscription = res;
        }, function(err){
          console.log(err);
        }) 
      }
    }, function(err){
      console.log(err);
    });

    $state.go('home');
  }

});