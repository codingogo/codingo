var app = angular.module('codingo', [
  'ngStamplay',
  'ui.router'
])
.run( function ($stamplay, $location){
  Stamplay.init('codingo');
})
.config(function ($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/index.html');
  $stateProvider
    .state('home', {
      url: '/home',    
      views: {
        '': {
          templateUrl: '/ng-app/main/lessons.html',
          controller: 'LessonsCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'MainCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        '': {
          templateUrl: '/ng-app/partials/login.html',
          controller: 'MainCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'MainCtrl'
        }
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        '': {
          templateUrl: '/ng-app/partials/signup.html',
          controller: 'MainCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'MainCtrl'
        }
      }
    })
    .state('pricing', {
      url: '/pricing',     
      views: {
        '': {
          templateUrl: '/ng-app/pages/pricing.html'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'MainCtrl'
        }
      }
    })
    .state('lessonDetail', {
      url: '/lesson/:lessonId',
      templateUrl: '/ng-app/main/lesson_content.html',
      controller: 'LessonCtrl'
    });

    $urlRouterProvider.otherwise('/home');
})
.service('User', function($stamplay, $q){
     // return an object with all our functions
    return {
      getCurrent: function() {
        var def = $q.defer();

        // instantiate a new user model from the stamplay js sdk
        var user = new Stamplay.User().Model;
        user.currentUser()
            .then(function() {
                // send the entire user model back
                def.resolve(user);
            });

        return def.promise;
      },
      signup: function(data) {
        var def = $q.defer();

        // instantiate a new user model from the stamplay js sdk
        var user = new Stamplay.User().Model;
        user.signup(data)
            .then(function() {
                // send the entire user model back
                def.resolve(user);
            })

        return def.promise;
      },
      login: function(data) {
        var def = $q.defer();

        var user = Stamplay.User().Model;
        user.login(data.email, data.password)
            .then(function() {
                // send the entire user model back
                def.resolve(user);
            }, function() {
                def.reject({ 'error': 'Unable to login user.' });
            });

        return def.promise;
      },
      logout: function() {
        var user = Stamplay.User().Model;
        user.logout();
        $rootScope.currentUser = {};
        console.log($rootScope.currentUser);
      },
      showw: function(){
        console.log('checking');
      }
    }; 
})
.controller('MainCtrl',['$scope','User', '$rootScope','$state', function ($scope, User, $rootScope, $state){

    var main = this;
    // main.logout = logout;
    $rootScope.currentUser = {};

    User.getCurrent().then(function(data){
      if(data.get('_id')){
        $rootScope.currentUser.id = data.get('_id');
        $rootScope.currentUser.name = data.get('username');
        $rootScope.currentUser.email = data.get('email');
        console.log($rootScope.currentUser);
      } else {
        $rootScope.currentUser = {};
      }
    });

    $scope.signup = function(signupData) {
      User.signup(signupData)
        .then(function(data) {
          console.log(data);
          if (data.get('_id')) {
            $rootScope.currentUser.id    = data.get('_id');
            $rootScope.currentUser.name  = data.get('username');
            $rootScope.currentUser.email = data.get('email');
            // redirect the user
            $state.go('home');
          }
        });
    };   

    $scope.login = function(loginData){
      User.login(loginData)
        .then(function(data) {
          console.log(data);
          if (data.get('_id')) {
            $rootScope.currentUser.id    = data.get('_id');
            $rootScope.currentUser.name  = data.get('username');
            $rootScope.currentUser.email = data.get('email');
            // redirect the user
            $state.go('home');
          }
        });   
    }

    $scope.logout = function(){
      console.log('logged out')
      User.logout();
      $rootScope.currentUser = {};
      $state.go('home');
    };
    $scope.showw = function(){
      console.log('checking');
      User.logout();
    }
}])