/*
This is the controller in charge to make the API call to the login endpoint for email+passowrd authentication.
*/
app.controller('LoginCtrl', ['$scope', '$state', 'UserStatus', 'GlobalVariable', '$stamplay',
  function LoginController($scope, $state, UserStatus, GlobalVariable, $stamplay) {
    $scope.spinner = false;
    //setting regexp for email field
    $scope.EMAIL = GlobalVariable.email;

    //login function   
    $scope.login = function (login) {
      $scope.spinner = true;
      var userInput = {
        email: login.email,
        password: login.password
      }
      UserStatus.loginUser(userInput)
      .then(function(res){
        $scope.spinner = false;
        $state.go('home');
      }, function(err){
        console.log(err);
        $scope.error = "이메일 또는 비밀번호 입력이 잘못됐습니다";
        $scope.$apply(function(){
          $scope.spinner = false;
        })
      });
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
    }
}])