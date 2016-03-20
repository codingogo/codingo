app.controller('SubscriptionsCtrl', function($scope, $stamplay, UserStatus, $state, $rootScope, GlobalVariable, Validator){
  
  $scope.spinner = false;
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
    $scope.spinner = true;
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
            $scope.spinner = false;
            $scope.$apply(function(){
              $scope.error = "카드정보가 옳지 않습니다 ";
            })
          } else {
            var token = response.id;
            var used = response.used;

            // user has no credit card
            if(hasCard === undefined || hasCard === false){
              UserStatus.createCard(user_id, token)
              .then(function(resCard){
                $scope.$apply(function(){
                  $scope.user.hasCard = true;
                  $rootScope.user.hasCard = true;
                })
                UserStatus.updateUser(user_id, {'hasCard': true});

                return UserStatus.subscribe(user_id, 'monthly_subscription');
              }, function(err){
                $scope.spinner = false;
                console.log(err);
              })
              .then(function(subscription){
                $scope.$apply(function(){
                  $rootScope.subscriptions = subscription;
                  $rootScope.subscribed = true;
                  UserStatus.updateUser(user_id, {'subscribed': true})
                  .then(function(){
                    $scope.successMsg = "Pro회원되신 것을 축하드립니다!"
                    Materialize.toast($scope.successMsg, 2000);
                    $scope.spinner = false;
                    $state.go('home');
                  }, function(err){
                    $scope.spinner = false;
                    $scope.error = err;
                  })
                }, function(err){
                  $scope.spinner = false;
                  console.log(err);
                });              
              }, function(err){
                $scope.spinner = false;
                console.log(err);
              });
            // user has a card
            } else {
              // get card
              UserStatus.getCard(user_id)
              .then(function(card){
                return UserStatus.subscribe(user_id, 'monthly_subscription');
              })
              .then(function(subscription){
                $scope.$apply(function(){
                  $rootScope.subscriptions = subscription;
                  $rootScope.subscribed = true;
                  UserStatus.updateUser(user_id, {'subscribed': true})
                  .then(function(){
                    $scope.successMsg = "Pro회원되신 것을 축하드립니다!"
                    Materialize.toast($scope.successMsg, 2000);
                    $state.go('home');
                    $scope.spinner = false;
                  }, function(err){
                    $scope.error = err;
                    $scope.spinner = false;
                  })
                }, function(err){
                  console.log(err);
                  $scope.spinner = false;
                });              
              });
            }          
          }
        })
      })
    } else {
      $scope.error = "가격을 체크해주시기 바랍니다 ";
      $scope.spinner = false;
    }
  };
  // setting regexp for email field
  $scope.EMAIL = GlobalVariable.email;
  $scope.register = function(signup){
    $scope.spinner = true;
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
              $scope.spinner = false;
            }, function(){
              $scope.error = "회원가입이 실패했습니다";
              $scope.spinner = false;
            })
        })
        .error(function(data, status){
          $scope.error = "이미 사용된 이메일 또는 사용가능하지 않은 이메일입니다";
          $scope.spinner = false;
        })
    }
  };

  //login function   
  $scope.login = function(login) {
    $scope.spinner = true;
    var user = {
      email: login.email,
      password: login.password
    }
    UserStatus.loginUser(user)
    .then(function(){
      $scope.$apply(function(){
        $scope.logged = true;
        $scope.spinner = false;
      })
    },function(){
      $scope.error = data;
      $scope.$apply(function(){
        $scope.spinner = false;
      })
    })
  };  
});