app.controller('NavbarCtrl', ['$scope', '$location', 'userStatus', '$rootScope', '$stamplay',
  function NavbarController($scope, $location, userStatus, $rootScope, $stamplay) {
    $scope.currentTabIndex = 0;
    
    $scope.logout = function(){
      userStatus.logout()
    }
    //method for setting active class in navbar
    $scope.routeIs = function (routeName) {
      var index = $location.absUrl().split("/").pop();
      return index === routeName;
    };
    $scope.showTab = function(tabIndex){
      $scope.currentTabIndex = tabIndex;
    };

    if(userStatus.getUser().logged){
      $scope.logged = true;  
    }else{
      //default value of user Status
      $scope.logged = false;
      //Call service
      var user = userStatus.getUserModel();
      user.currentUser()
        .then(function(res){
          var user = res.user;
          // console.log(user);
          $rootScope.loggedUser = res.user;
        
          if(user._id !== undefined){
            $scope.$apply(function(){
              $scope.logged = true;
              $scope.displayName = user.displayName;
              $scope.email = user.email;
              
              // Globally sets user
              $rootScope.user = user;
              $rootScope.user.logged = true;
              if(user.profileImg !== ''){
                $scope.picture = user.profileImg;
              } else {
                $rootScope.picture = './ng-app/assets/images/sample2.jpg';
              }
              Stamplay.Stripe.getCreditCard(user._id)
              .then(function(data){
                // console.log(data);
              }, function(err){
                // console.log(err);
              });
              // console.log(user._id);
              // Get user subscription
              Stamplay.Stripe.getSubscriptions(user._id, 'monthly_subscription').then(function(data){
                // console.log('subscription data',data);
                $rootScope.user.subscriptions = data;
              }, function(err){
                // console.log(err);
              })
            })
            userStatus.setUser(user.displayName, user.profileImg, user._id, user.email, true)
            }
          }, function(err){
            // console.log(err);
          })
      }
    }
])
