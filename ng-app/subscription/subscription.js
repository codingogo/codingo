app.controller('SubscriptionsCtrl', function($scope, $stamplay, UserStatus, $state){
  $scope.subscribeMembership = function(card){
    var cardInfo = {
      number: card.number,
      cvc: card.cvc,
      exp_month: card.exp_month,
      exp_year: card.exp_year
    }
  
    UserStatus.getUser()
    .then(function(res){
      var user_id = res.user._id;
      var hasCard = res.user.hasCard;
      console.log('user',res);

      Stripe.card.createToken(cardInfo, function(status, response){
        if(response.error){
          console.log('err', error);
        } else {
          console.log('card token', response);
          var token = response.id;
          var used = response.used;
          console.log('token', token);
          console.log('card used', used);
          console.log('hasCard', hasCard);

          // user has no credit card
          if(hasCard === undefined || hasCard === false){
            UserStatus.createCard(user_id, token)
            .then(function(resCard){
              console.log('card', resCard);
              $scope.$apply(function(){
                $scope.user.hasCard = true;
                $rootScope.user.hasCard = true;
              })
              UserStatus.updateUser(user_id, {'hasCard': true});

              return UserStatus.subscribe(user_id, 'monthly_subscription');
            })
            .then(function(subscription){
              console.log('subscription', subscription);
              $scope.$apply(function(){
                $rootScope.subscriptions = subscription;
                // $scope.user.subscribed = true;
                $rootScope.user.subscribed = true;
                UserStatus.updateUser(user_id, {'subscribed': true});

              }, function(err){
                console.log(err);
              });              
            });

          // user has a card
          } else {
            // get card
            console.log('user id', user_id);
            UserStatus.getCard(user_id)
            .then(function(card){
              console.log('card info', card);
              return UserStatus.subscribe(user_id, 'monthly_subscription');
            })
            .then(function(subscription){
              console.log('subscription', subscription);
              $scope.$apply(function(){
                $rootScope.subscriptions = subscription;
                // $scope.user.subscribed = true;
                $rootScope.user.subscribed = true;
                UserStatus.updateUser(user_id, {'subscribed': true});
              }, function(err){
                console.log(err);
              });              
            });
          }
          $state.go('home');
        }
      })
    })
    // .then(function(card){
    //   // card doesn't exist    
    //   console.log('card', card);  
    //   if(res.fingerprint === undefined){   
    //     console.log('create card');     
    //     // create credit card          
    //     // Stripe.card.createToken(cardInfo, function(status, response){
    //     //   if(response.error){
    //     //     console.log('err', response.error)
    //     //   } else {
    //     //     var token = response.id;
    //     //     var cardId = response.card.id;

    //     //     Stamplay.Stripe.createCreditCard(user_id, token)
    //     //     .then(function(returnCard){
    //     //       // create subscription
    //     //       UserStatus.subscribe(user_id, 'monthly_subscription')
    //     //       .then(function(res){
    //     //         $rootScope.subscription = res;
    //     //         consol.log(res);
    //     //       }, function(err){
    //     //         console.log(err);
    //     //       })              
    //     //     })
    //     //   }
    //     // })        
    //   } else {
    //     // card exist        
    //     // created subscription
    //     UserStatus.subscribe(user_id, 'monthly_subscription')
    //     .then(function(res){
    //       $rootScope.subscription = res;
    //       console.log(res);
    //     }, function(err){
    //       console.log(err);
    //     }) 
    //   }
    // }, function(err){
    //   console.log(err);
    // });

    
  }

});