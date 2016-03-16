app.controller('RegistrationCtrl', ['$scope', 'UserStatus', 'globalVariable', 'validator','$state', '$stateParams',
  function RegistrationCtrl($scope, UserStatus, globalVariable, validator, $state) {

    //setting regexp for email field
    $scope.EMAIL = globalVariable.email
    //register function
    $scope.register = function () {
      if ($scope.email && $scope.password && $scope.displayName) {
        var user = {
          email: $scope.email,
          password: $scope.password,
          displayName: $scope.displayName
        }
        var validate = {
            email: $scope.email
          }
          //first step verify email is not already used
        validator.validateEmail(validate)
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
