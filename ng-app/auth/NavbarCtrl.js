module.exports= function(app){ 
  app.controller('NavbarCtrl', ['$scope', '$location', 'UserStatus', '$rootScope', '$stamplay',
  function NavbarController($scope, $location, UserStatus, $rootScope, $stamplay) {
    $scope.spinner = false;
    $scope.currentTabIndex = 0;
    $scope.subscribed = false;
    var user_id;

    $scope.logout = function(){
      UserStatus.logout()
      .then(function(res){
        $scope.logged = false;
      })
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
            $rootScope.picture = './ng-app/assets/images/person.png';
          }
        })
        UserStatus.setUser(user.displayName, user.profileImg, user._id, user.email, true);
      }
      return UserStatus.getSubscriptions(user._id, 'monthly_discount_subscription');
    })
    .then(function(subscription){
      UserStatus.updateUser(user_id, {'subscriptions': subscription})
      var status = subscription.data[0].status;
      if(status === 'active'){
        $scope.subscribed = true;
      }
      if(user_id !== undefined){
        $scope.$apply(function(){
          $rootScope.subscriptions = subscription;
        }, function(err){
        });
      } 
    })
  }

]);
}