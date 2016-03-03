app.controller('authenticateCtrl', function(User, $rootScope, $state){
  var authenticate = this;

  authenticate.signupData = {};
  authenticate.loginData = {};

  authenticate.signup = signup;
  authenticate.login = login;

  function signup(){
    User.signup(authenticate.signupData)
      .then(function(data){
        console.log('checking');
        if(data.get('_id')){
          $rootScope.currentUser.id = data.get('_id');
          $rootScope.currentUser.name = data.get('username');
        
          $state.go('home');
        }
      });
  }

  function login(){
    User.login(authenticate.loginData)
      .then(function(data){
        if(data.get('_id')){
          $rootScope.currentUser.id = data.get('_id');
          $rootScope.currentUser.name = data.get('username');

        $state.go('home');  
        }
      });
  }
});