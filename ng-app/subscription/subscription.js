app.controller('SubscriptionsCtrl', function($scope, $stamplay, UserStatus, $state, $rootScope, GlobalVariable, Validator){
  
  $scope.monthly_sub = false;
  // set up to signup-are initially
  $scope.currentTabIndex = 0;

  $scope.showTab = function(tabIndex) {
    $scope.currentTabIndex = tabIndex;
  }; 

  $scope.checked = function(check){
    $scope.monthly_sub = !$scope.monthly_sub;
    console.log($scope.monthly_sub);
  };
  $scope.subscribeMembership = function(card){
    $scope.error = false;
    var cardInfo = {
      number: card.number,
      cvc: card.cvc,
      exp_month: card.exp_month,
      exp_year: card.exp_year
    }
    if($scope.monthly_sub === true){
      UserStatus.getUser()
      .then(function(res){
        var user_id = res.user._id;
        var hasCard = res.user.hasCard;
        console.log('user',res);

        Stripe.card.createToken(cardInfo, function(status, response){
          if(response.error){
            console.log('err', status);
            $scope.$apply(function(){
              $scope.error = "카드정보가 옳지 않습니다 ";
            })
          } else {
            console.log('card token', response);
            var token = response.id;
            var used = response.used;
            console.log('token', token);
            console.log('card used', used);
            // console.log('hasCard', hasCard);

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
              }, function(err){
                console.log(err);
              })
              .then(function(subscription){
                console.log('subscription', subscription);
                $scope.$apply(function(){
                  $rootScope.subscriptions = subscription;
                  // $scope.user.subscribed = true;
                  $rootScope.subscribed = true;
                  UserStatus.updateUser(user_id, {'subscribed': true})
                  .then(function(){
                    $state.go('home');
                  })
                }, function(err){
                  console.log(err);
                });              
              }, function(err){
                console.log(err);
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
                  $rootScope.subscribed = true;
                  UserStatus.updateUser(user_id, {'subscribed': true})
                  .then(function(){
                    $state.go('home');
                  })
                }, function(err){
                  console.log(err);
                });              
              });
            }          
          }
        })
      })
    } else {
      $scope.error = "가격을 체크해주시기 바랍니다 "
    }
  };
  // setting regexp for email field
  $scope.EMAIL = GlobalVariable.email;
  $scope.register = function(signup){
    if(signup.email && signup.password && signup.displayName){
      var user = {
        email: signup.email,
        password: signup.password,
        displayName: signup.displayName
      }
      var validate = {
        email: signup.email
      }
      Validator.validateEmail(validate)
        .success(function(data, status){
          UserStatus.registerUser(user)
            .then(function(){
              $scope.$apply(function(){
                $scope.logged = true;
              })
            }, function(){
              $scope.error = '회원가입이 실패했습니다';
            })
        })
        .error(function(data, status){
          $scope.error = '이미 사용된 이메일 또는 사용가능하지 않은 이메일입니다';
        })
    }
  };

  //login function   
  $scope.login = function (login) {
    var user = {
      email: login.email,
      password: login.password
    }
    UserStatus.loginUser(user).then(function(){
      $scope.$apply(function(){
        $scope.logged = true;
      })
    },function(){
      $scope.error = data;
    })
  };  
});