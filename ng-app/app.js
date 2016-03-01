var app = angular.module('codingo', [
  'ngStamplay',
  'ui.router'
])
.run( function ($stamplay, $location){
  // $rootScope.$0n('auth:login-success', function(userInfo){
  //   $location.path('/');
  // });
  Stamplay.init('codingo');
})
.config(function ($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/index.html');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/ng-app/main/lessons.html',
      controller: 'LessonsCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/ng-app/partials/login.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/ng-app/partials/signup.html'
    })
    .state('pricing', {
      url: '/pricing',
      templateUrl: '/ng-app/pages/pricing.html'
    })
    .state('lessonDetail', {
      url: '/lesson/:lessonId',
      templateUrl: '/ng-app/main/lesson_content.html',
      controller: 'LessonCtrl'
    });

    $urlRouterProvider.otherwise('/home');
})

.controller('MainCtrl', function MainCtrl (User, $rootScope){

  function MainCtrl(User){
    var main = this;
    $rootScope.currentUser = {};

    User.getCurrent().then(function(data){
      if(data.get('_id')){
        $rootScope.currentUser.id = data.get('_id');
        $rootScope.currentUser.name = data.get('displayName');
      } else {
        $rootScope.currentUser = {};
      }
    });
  }
})