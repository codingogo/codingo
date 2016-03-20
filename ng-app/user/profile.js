// Profile Page
app.controller('ProfileCtrl', function($scope, UserStatus, $state, $rootScope){

  var user_id;
  var subscriptionId;  
  $scope.currentTabIndex = 0;
  $scope.spinner = false;

  $scope.showTab = function(tabIndex){
    $scope.currentTabIndex = tabIndex;
  };

  $scope.cancelSubscription = function(){
    $scope.spinner = true;
    UserStatus.getUser()
    .then(function(res){
      user_id = res.user._id;
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
            $scope.spinner = false;
            $state.go('home');
          }, function(err){
            console.log(err);
            $scope.error = err;
            $scope.spinner = false;
          })
      }, function(err){
        $scope.error = err;
        console.log(err);
        $scope.spinner = false;
      })
    }, function(err){
      $scope.error = err;
      console.log(err);
      $scope.spinner = false;
    })
  };

  $scope.deleteUser = function(){
    $scope.spinner = true;
    UserStatus.getUser()
    .then(function(res){
      user_id = res.user._id;
      this.user_id = user_id;
      return UserStatus.deleteUser(user_id);
    }, function(err){
      $scope.error = err;
      $scope.spinner = false;
    })
    .then(function(res){
      return UserStatus.logout();
    }, function(err){
      $scope.error = err;
      $scope.spinner = false;
    })
    .then(function(res){
      $scope.message = "회원탈퇴하셨습니다. 개선해야할 문제를 support@codingo.co로 보내주시면 최선을 다하겠습니다. 감사합니다.";
      $scope.spinner = false;
    }, function(err){
      $scope.error = err;
      $scope.spinner = false;
    })
  };
});