/*
This controller is the only one present in every view of this app since it's binded
to the main navigation bar of the app.
It must be able to recognize user status showing `Login/Logout` button,
and it is responsible of understanding the current page visited by the user
to highlight it on the navigation bar (check `function RouteIs`).
*/
app.controller('NavbarCtrl', ['$scope', '$location', 'userStatus', '$rootScope',
  function NavbarController($scope, $location, userStatus, $rootScope) {
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
      var user = userStatus.getUserModel()
      //if user was defined -> update $scope
      user.currentUser()
        .then(function(res){
          // console.log(res.user);
          var user = res.user;
          $rootScope.loggedUser = res.user;
          var logged = user._id;
          if(logged !== undefined){
              $scope.$apply(function(){
                $scope.logged = true;
                $scope.username = user.username;
                $scope.email = user.email;
                $rootScope.user = user;
                if(user.profileImg !== ''){
                  $scope.picture = user.profileImg;
                } else {
                  $rootScope.picture = './ng-app/assets/images/sample2.jpg';
                }
                $scope._id = user._id;
              })
              userStatus.setUser(user.username, user.profileImg, user._id, user.email, true)
            }
          }, function(err){
            console.log(err);
          })
      }
    }



])
