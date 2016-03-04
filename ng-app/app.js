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
          controller: 'NavbarCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        '': {
          templateUrl: '/ng-app/partials/login.html',
          controller: 'LoginCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    })

    .state('registration', {
      url: '/registration',
      views: {
        '': {
          templateUrl: '/ng-app/partials/registration.html',
          controller: 'RegistrationCtrl'
        },        
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
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
          controller: 'NavbarCtrl'
        }
      }
    })
    .state('lessonDetail', {
      url: '/lesson/:lessonId',
      views: {
        '': {
          templateUrl: '/ng-app/main/lesson_content.html',
          controller: 'LessonCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }      
    });

    $urlRouterProvider.otherwise('/home');
});
