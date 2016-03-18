/*
This is the controller in charge to make the API call to the login endpoint for email+passowrd authentication.
*/
app.controller('LoginCtrl', ['$scope', '$state', 'UserStatus', 'GlobalVariable', '$stamplay',
  function LoginController($scope, $state, UserStatus, GlobalVariable, $stamplay) {

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

    // retrieve password
    $scope.sendEmail = function(reset){
      var emailAndNewPassword = {
        email: "reset.email",
        newPassword: "reset.password"
      };
      console.log(reset);
      Stamplay.User.resetPassword(emailAndNewPassword, function(err, res){
        if(err) return console.log(err);
        console.log(res);
      })
      // Stamplay.User.resetPassword(emailAndNewPassword)
      // .then(function(res){
      //   console.log(res);
      //   $scope.message = "비밀번호 재설정 이메일을 보냈습니다."
      // }, function(err){
      //   console.log(err);
      //   $scope.error = err;
      // })

    }
}])