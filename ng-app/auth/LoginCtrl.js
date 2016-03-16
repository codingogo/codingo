/*
This is the controller in charge to make the API call to the login endpoint for email+passowrd authentication.
*/
app.controller('LoginCtrl', ['$scope', '$state', 'UserStatus', 'globalVariable', '$state',
  function LoginController($scope, $state, UserStatus, globalVariable) {

    //setting regexp for email field
    $scope.EMAIL = globalVariable.email;

    //login function   
    $scope.login = function () {
      var user = {
        email: $scope.email,
        password: $scope.password
      }
      UserStatus.loginUser(user).then(function(){
        
        $state.go('home');
      },function(){
        $scope.error = data;
      })
    }
}])