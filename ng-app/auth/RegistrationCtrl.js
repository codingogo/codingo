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
              $scope.error = 'Registration Failed'
            })
          })
          .error(function (data, status) {
            $scope.error = 'Email Already Exist or invalid'
          })
      }
    }
 
}])
