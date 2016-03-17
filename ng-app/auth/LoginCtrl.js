/*
This is the controller in charge to make the API call to the login endpoint for email+passowrd authentication.
*/
app.controller('LoginCtrl', ['$scope', '$state', 'UserStatus', 'GlobalVariable', '$state',
  function LoginController($scope, $state, UserStatus, GlobalVariable) {

    //setting regexp for email field
    $scope.EMAIL = GlobalVariable.email;

    //login function   
    $scope.login = function (login) {
      var user = {
        email: login.email,
        password: login.password
      }
      UserStatus.loginUser(user).then(function(){
        
        $state.go('home');
      },function(){
        $scope.error = data;
      })
    }
}])