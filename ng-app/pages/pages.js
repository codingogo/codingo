module.exports= function(app){ 
  app.controller('AboutCtrl', function($scope){
    
    $scope.footer = true;

    $scope.aboutInfo = [
      {subTitle: '쉬운 교육', icon: 'videocam', info: ['프로그래밍에대한 배경이 없더라도 영상을 따라 쉽게 코딩을 배울 수 있습니다.'], classInfo: 'col s12 m5 offset-m1'},
      {subTitle: '신속한 개발', icon: 'trending_up', info: ['본인이 원하는 것을 직접 해결한다면 개발이 신속해지고 범실도 줄일 수 있습니다.'], classInfo: 'col s12 m5'},
      {subTitle: '문제 해결', icon: 'question_answer', info: ['코딩과 스타트업은 문제를 해결하는 것이 핵심입니다. 문제를 빨리 해결할 수 있는 환경이 있다는 것은 소프트웨어 개발에 큰 도움이 될 것입니다.'], classInfo: 'col s12 m5 offset-m1'},
      {subTitle: '저렴한 비용', icon: 'payment', info: ['부담을 최소화한 비용으로 누구나 편하게 코딩을 배울 수 있습니다.'], classInfo: 'col s12 m5'}
    ];

  })
  .controller('ContactCtrl', function($scope, UserStatus){
    // var user = userStatus.getUserModel();
    
  })
  .controller('TermsCtrl', function($scope){

    
    
  })
};
