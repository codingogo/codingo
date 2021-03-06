var app = angular.module('codingo', [
  'ngStamplay',
  'ui.router',
  'ui.materialize'
])
.run( function ($stamplay, UserStatus, $rootScope){
  Stamplay.init('codingo');
  Stripe.setPublishableKey('pk_live_ukAmcMqroatAcXzjIteOXGYw');

})
.config(function ($stateProvider, $urlRouterProvider){
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
    .state('password', {
      url: '/password',
      views: {
        '': {
          templateUrl: '/ng-app/partials/_password.html',
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
          params: 'index',
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
    .state('profile', {
      url: '/profile',     
      views: {
        '': {
          templateUrl: '/ng-app/user/profile.html',
          controller: 'ProfileCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    }) 

    .state('subscriptions', {
      url: '/subscriptions',     
      views: {
        '': {
          templateUrl: '/ng-app/subscription/subscriptions.html',
          controller: 'SubscriptionsCtrl'                  
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    })         
    .state('about', {
      url: '/about',     
      views: {
        '': {
          templateUrl: '/ng-app/pages/about.html', 
          controller: 'AboutCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    })
    .state('blog', {
      url: '/blog',     
      views: {
        '': {
          templateUrl: '/ng-app/pages/blog.html', 
          controller: 'BlogCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    }) 
    .state('blogdetail', {
      url: '/blog/:id',     
      views: {
        '': {
          templateUrl: '/ng-app/pages/blog.html', 
          controller: 'BlogDetailCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    })        
    .state('service', {
      url: '/service',     
      views: {
        '': {
          templateUrl: '/ng-app/pages/service.html'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    })  
    .state('faq', {
      url: '/faq',     
      views: {
        '': {
          templateUrl: '/ng-app/pages/faq.html'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    })         
    .state('contact', {
      url: '/contact',     
      views: {
        '': {
          templateUrl: '/ng-app/pages/contact.html',
          controller: 'ContactCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    }) 
    .state('policies', {
      url: '/policies',     
      views: {
        '': {
          templateUrl: '/ng-app/pages/policies.html'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    }) 
    .state('terms', {
      url: '/terms',     
      views: {
        '': {
          templateUrl: '/ng-app/pages/terms.html',
          controller: 'TermsCtrl'
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }
    }) 
    .state('comingsoon', {
      url: '/comingsoon',
      views: {
        '': {
          templateUrl: '/ng-app/pages/comingsoon.html'
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
          templateUrl: '/ng-app/main/lesson_show.html',
          controller: 'LessonCtrl',
          resolve: {
            qId: function($stateParams){
              return $stateParams;
            }
          }
        },
        'header': {
          templateUrl: '/ng-app/partials/header.html',
          controller: 'NavbarCtrl'
        }
      }      
    });

    $urlRouterProvider.otherwise('/home');
});

require('./auth/NavbarCtrl')(app);
require('./services/UserStatus')(app);
require('./main/lessons')(app);
require('./services/LessonService')(app);
require('./auth/LoginCtrl')(app);
require('./auth/RegistrationCtrl')(app);
require('./pages/pages')(app);
require('./user/profile')(app);
require('./subscription/subscription')(app);
require('./services/VideoService')(app);
require('./services/GlobalVariable')(app);
require('./services/Validator.js')(app);
require('./services/AnchorSmoothScroll.js')(app);
require('./services/BlogService.js')(app);
