app.controller('RegistrationCtrl', ['$scope', 'UserStatus', 'GlobalVariable', 'Validator','$state',
  function RegistrationCtrl($scope, UserStatus, GlobalVariable, Validator, $state) {   
    $scope.spinner = false;
    
    //setting regexp for email field
    $scope.EMAIL = GlobalVariable.email;
    //register function
    $scope.register = function (signup) {
      $scope.spinner = true;
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
                $scope.spinner = false;
                $scope.successMsg = "코딩고 회원님되신 것을 축하드립니다!"
                Materialize.toast($scope.successMsg, 2000);
                $state.go('home');
            },function(){
              $scope.spinner = false;
              $scope.error = '회원가입이 실패했습니다';
            })
          })
          .error(function (data, status) {
            $scope.error = '이미 사용된 이메일 또는 사용가능하지 않은 이메일입니다';
            $scope.spinner = false;
          })
      }
    }
 
}])
