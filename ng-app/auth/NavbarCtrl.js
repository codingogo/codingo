app.controller('NavbarCtrl', ['$scope', '$location', 'UserStatus', '$rootScope', '$stamplay',
  function NavbarController($scope, $location, UserStatus, $rootScope, $stamplay) {
    $scope.currentTabIndex = 0;
    $scope.subscribed = false;
    var user_id;
    $scope.logout = function(){
      UserStatus.logout()
    }
    //method for setting active class in navbar
    $scope.routeIs = function (routeName) {
      var index = $location.absUrl().split("/").pop();
      return index === routeName;
    };
    $scope.showTab = function(tabIndex){
      $scope.currentTabIndex = tabIndex;
    };

    // Set User for Header
    UserStatus.getUser()
    .then(function(res){
      // console.log('user', res.user);
      var user = res.user;
      user_id = res.user._id;
      if(user._id !== undefined){
        $scope.$apply(function(){
          $scope.logged = true;
          $scope.displayName = user.displayName;
          $scope.email = user.email;
          // Globally set user
          $rootScope.user = user;
          $rootScope.user.logged = true;
          $rootScope.logged = true;
          if(user.profileImg !== ''){
            $scope.picture = user.profileImg;
          } else {
            $rootScope.picture = './ng-app/assets/images/sample2.jpg';
          }
        })
        UserStatus.setUser(user.displayName, user.profileImg, user._id, user.email, true);
      }
      return UserStatus.getSubscriptions(user._id, 'monthly_subscription');
    })
    .then(function(subscription){
      // console.log('subscription', subscription);
      UserStatus.updateUser(user_id, {'subscriptions': subscription})
      // console.log(subscription.data[0].status);
      var status = subscription.data[0].status;
      if(status === 'active'){
        $scope.subscribed = true;
      }
      if(user_id !== undefined){
        $scope.$apply(function(){
          $rootScope.subscriptions = subscription;
          // console.log('updated user');
        }, function(err){
          console.log(err);
        });
      } 
    })
  }

]);
