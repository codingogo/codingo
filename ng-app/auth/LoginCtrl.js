app.controller('LoginCtrl', ['$scope', '$state', 'UserStatus', 'GlobalVariable', '$stamplay', '$window',
  function LoginController($scope, $state, UserStatus, GlobalVariable, $stamplay, $window) {
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
        $scope.error = "이메일 또는 비밀번호 입력이 잘못됐습니다";
        $scope.$apply(function(){
          $scope.spinner = false;
        })
      });
    }

    // retrieve password
    $scope.sendEmail = function(reset){
      $scope.spinner = true;

      var emailAndNewPassword = {
        email: reset.email,
        newPassword: reset.password
      };

      if(emailAndNewPassword !== undefined){
        Stamplay.User.resetPassword(emailAndNewPassword)
        .then(function(res){
          $scope.successMsg = "비밀번호 재설정 이메일이 보내졌습니다. 보내진 이메일에 링크를 클릭하여 변경을 확인해주시기 바랍니다."
          Materialize.toast($scope.successMsg, 8000);
          $scope.spinner = false;
          $state.go('home');
        }, function(err){
          $scope.$apply(function(){
            $scope.spinner = false;
          });
          $scope.error = '죄송합니다. 이메일을 확인해주세요.';
        })
      };
    }
}])