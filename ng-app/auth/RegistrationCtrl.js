app.controller('RegistrationCtrl', ['$scope', 'userStatus', 'globalVariable', 'validator','$state', '$stateParams',
  function RegistrationCtrl($scope, userStatus, globalVariable, validator, $state, $stateParams) {

    //setting regexp for email field
    $scope.EMAIL = globalVariable.email
    //register function
    $scope.register = function () {
      if ($scope.email && $scope.password && $scope.username) {
        var user = {
          email: $scope.email,
          password: $scope.password,
          username: $scope.username
        }
        var validate = {
            email: $scope.email
          }
          //first step verify email is not already used
        validator.validateEmail(validate)
          .success(function (data, status) {
            //second step register user
            userStatus.registerUser(user).then(function(){
              if($stateParams.subscribe === 'subscribe'){
                $state.go('subscribe');
              } else {
                $state.go('home');
              }
            },function(){
              $scope.error = 'Registration Failed'
            })
          })
          .error(function (data, status) {
            $scope.error = 'Email Already Exist or invalid'
          })
      }
    }
    console.log($stateParams.subscribe);
}])
