// Profile Page
app.controller('ProfileCtrl', function($scope, UserStatus, $state, $rootScope){
  $scope.currentTabIndex = 0;
  
  $scope.showTab = function(tabIndex){
    $scope.currentTabIndex = tabIndex;
  };

  $scope.cancelSubscription = function(){
    var user_id;
    var subscriptionId; 
    UserStatus.getUser()
    .then(function(res){
      user_id = res.user._id;
      console.log(user_id);
      return UserStatus.getSubscriptions(user_id, '');
    }, function(err){
      console.log(err);
      $scope.error = err;
    })
    .then(function(getSubs){
      console.log('getSubs', getSubs);
      console.log('subid', getSubs.data[0].id)
      subscriptionId = getSubs.data[0].id;
      console.log(user_id);
      console.log(subscriptionId);
      return UserStatus.unsubscribe(user_id, subscriptionId, {});
    })
    .then(function(cancellation){
      console.log(cancellation);
      $scope.$apply(function(){
        $rootScope.subscriptions = cancellation;
        $rootScope.subscribed = false;
        UserStatus.updateUser(user_id, {'subscribed': false})
          .then(function(res){
            console.log(res);
            $state.go('home');
          }, function(err){
            console.log(err);
            $scope.error = err;
          })
      }, function(err){
        $scope.error = err;
        console.log(err);
      })
    }, function(err){
      $scope.error = err;
      console.log(err);
    })
  };
});