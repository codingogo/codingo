module.exports= function(app){ 
  app.controller('SubscriptionsCtrl', function($scope, $stamplay, UserStatus, $state, $rootScope, GlobalVariable, Validator){

    var currentUser;
    var userId;
    var storedCard;

    $scope.spinner = false;
    $scope.monthly_sub = false;
    
    $scope.currentTabIndex = 0;
    $scope.card = {};

    $scope.months = [
      {'month': '만기달', value: ''},
      {'month': '01', value: 1},
      {'month': '02', value: 2},
      {'month': '03', value: 3},
      {'month': '04', value: 4},
      {'month': '05', value: 5},
      {'month': '06', value: 6},
      {'month': '07', value: 7},
      {'month': '08', value: 8},
      {'month': '09', value: 9},
      {'month': '10', value: 10},
      {'month': '11', value: 11},
      {'month': '12', value: 12}
    ];
    $scope.card.exp_month = $scope.months[0];

    $scope.years = [
      {'year': '만기년도', value: ''},
      {'year': 2016, value: 2016},
      {'year': 2017, value: 2017},
      {'year': 2018, value: 2018},
      {'year': 2019, value: 2019},
      {'year': 2020, value: 2020},
      {'year': 2021, value: 2021},
      {'year': 2022, value: 2022},
      {'year': 2023, value: 2023},
      {'year': 2024, value: 2024},
      {'year': 2025, value: 2025},
      {'year': 2026, value: 2026},
      {'year': 2027, value: 2027},
      {'year': 2028, value: 2028},
      {'year': 2029, value: 2029},
      {'year': 2030, value: 2030},
    ]
    $scope.card.exp_year = $scope.years[0];

    $scope.showTab = function(tabIndex) {
      $scope.currentTabIndex = tabIndex;
    }; 

    $scope.checked = function(check){
      $scope.monthly_sub = !$scope.monthly_sub;
    };

    $scope.getUser = function() {
      UserStatus.getUser()
      .then(function(res){
        // Set cuerrentUser and userId
        currentUser = res;
        userId = res.user._id;
        console.log('currenUser', currentUser);
        return UserStatus.getCard(userId);
      }, function(err){
        console.log('err user', err);
      })
      .then(function(resCard){
        storedCard = resCard;
        console.log('storedCard', storedCard);
      }, function(err){
        console.log('storedCard err', err);
      })
    };

    $scope.getUser();

    $scope.subscribeMembership = function(card){
      $scope.error = false;
      $scope.spinner = true;

      var cardObj = {
        number: card.number,
        cvc: card.cvc,
        exp_month: card.exp_month.value,
        exp_year: card.exp_year.value
      }

      // price checked
      if($scope.monthly_sub === true){

        // card exists
        if(storedCard.card_id){
          Stripe.card.createToken(cardObj, function(status, response){
            if(response.object !== 'token'){
              $scope.spinner = false;
              $scope.$apply(function() {
                $scope.error = "카드정보가 옳지 않습니다 ";
              })
            } else {
              var token = response.id;
              UserStatus.updateCard(userId, token)
              .then(function(resUpdated){
                return UserStatus.subscribe(userId, 'monthly_subscription');
              }, function(err){
                $scope.spinner = false;
                console.log('updatedCard err', err);
              })
              .then(function(subscription){
                $scope.$apply(function(){
                  $rootScope.subscriptions = subscription;
                  $rootScope.subscribe = true;
                  UserStatus.updateUser(userId, {'subscribed': true})
                  .then(function(){
                    $scope.successMsg = "Pro회원가입을 축하합니다. ";
                    Materialize.toast($scope.successMsg, 2000);
                    $state.go('home');
                    $scope.spinner = false;
                  }, function(err){
                    $scope.error = err;
                    $scope.spinner = false;
                  })
                })
              }, function(err){
                $scope.spinner = false;
                console.log('last err', err);
              })
            }
          })
        }

        // if card is new
        if(storedCard === undefined) {
          Stripe.card.createToken(cardObj, function(status, response){
            if(response.object !== 'token'){
              $scope.spinner = false;
              $scope.$apply(function() {
                $scope.error = "카드정보가 옳지 않습니다 ";
              })
            } else {
              var token = response.id;
              UserStatus.createCard(userId, token)
              .then(function(resCard){
                $scope.$apply(function(){
                  $scope.user.hasCard = true;
                  $rootScope.user.hasCard = true;
                })
                UserStatus.updateUser(userId, {'hasCard': true});
                return UserStatus.subscribe(userId, 'monthly_subscription');
              }, function(err){
                $scope.spinner = false;
                console.log('new card err', err);
              })
              .then(function(subscription){
                if(subscription !== undefined){
                  $scope.$apply(function(){
                    $rootScope.subscription = subscription;
                    $rootScope.subscribe = true;
                    UserStatus.updateUser(userId, {'subscribed': true})
                    .then(function(){
                      $scope.successMsg = "Pro회원가입을 축하합니다!";
                      Materialize.toast($scope.successMsg, 2000);
                      $scope.spinner = false;
                      $state.go('home');
                    }, function(err){
                      $scope.spinner = false;
                      $scope.error = err;
                    });
                  })
                } else {
                  $scope.$apply(function(){
                    $scope.error = "카드정보가 옳지 않습니다. ";
                    $scope.spinner = false;
                  })
                }
              }, function(err){
                $scope.spinner = false;
              });
            }          
          })
        }

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
                $scope.error = "회원가입에 실패했습니다";
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
}