app.controller('RegistrationCtrl', ['$scope', 'UserStatus', 'GlobalVariable', 'Validator','$state',
  function RegistrationCtrl($scope, UserStatus, GlobalVariable, Validator, $state) {   

    //setting regexp for email field
    $scope.EMAIL = GlobalVariable.email;
    //register function
    $scope.register = function (signup) {
      console.log(signup);
      if (signup.email && signup.password && signup.displayName) {
        var user = {
          email: signup.email,
          password: signup.password,
          displayName: signup.displayName
        }
        var validate = {
            email: signup.email
          }
          //first step verify email is not already used
        Validator.validateEmail(validate)
          .success(function (data, status) {
            //second step register user
            UserStatus.registerUser(user).then(function(){
                $state.go('home');
            },function(){
              $scope.error = '회원가입이 실패했습니다';
            })
          })
          .error(function (data, status) {
            $scope.error = '이미 사용된 이메일 또는 사용가능하지 않은 이메일입니다';
          })
      }
    }
 
}])
