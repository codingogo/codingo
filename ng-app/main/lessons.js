app.controller('LessonsCtrl', function($scope, $rootScope, $stamplay, Lesson, UserStatus){
  $scope.lessons = [];
  
  var initialise = function(){
    loadLessons();
    getUser();
  }

  var getUser = function(){
    UserStatus.getUser()
    .then(function(res){
      console.log('user', res);
    })
  };

  var loadLessons = function(){
    Lesson.all().then(function(lessons){
      lessons.data.forEach(function(returnData, index){
        if(returnData.level === 0){
          lessons.data[index].level = '초급';
        } else if (returnData.level === 1){
          lessons.data[index].level = '중급';
        } else {
          lessons.data[index].level = '상급';
        }
      })
      $scope.lessons = lessons.data;
    })
  };

  initialise();
});

app.controller('LessonCtrl', function($scope, $stateParams, Lesson, Video, $sce){


  $scope.showTab = function(tabIndex) {
    $scope.videoLink = 'nothing';
    var src="http://fast.wistia.net/assets/external/E-v1.js";
    console.log($scope.videoLink);
    console.log(tabIndex);
    console.log($scope.filteredVideos[tabIndex].wistia);
    $scope.currentTabIndex = tabIndex;

    $scope.videoObj = $scope.filteredVideos[tabIndex];
    // console.log($scope.videoObj);
    console.log($scope.videoObj.wistia);

    $scope.videoLink = [{url: $sce.trustAsResourceUrl('//fast.wistia.net/embed/iframe/' + $scope.videoObj.wistia)}];     
    console.log($scope.videoLink);   

  };




  $scope.initialise = function(){
    $scope.currentTabIndex = 0;
    $scope.lessonId = $stateParams.lessonId;
    $scope.videoId = $stateParams;
  
    Lesson.get($stateParams.lessonId)
      .then(function(data){
        // console.log('data', data.data[0]);
        $scope.premium = data.data[0].premium;
        // console.log('premium', $scope.premium);
        $scope.lessonObj = data.data[0];
    });

    if($scope.filteredVideos){
      $scope.videoObj = $scope.filteredVideos[0];
      console.log($scope.videoObj);
    };

    Video.get($stateParams)
      .then(function(data){
        var obj = data.data;
        var result = obj.filter(function(val){
          return val.lesson_id == $stateParams.lessonId;
        })
        console.log('result', result);
        $scope.filteredVideos = result;
        $scope.videoObj = $scope.filteredVideos[0];
        // $scope.videoLink = $scope.videoObj.wistia
        $scope.videoLink = [{url: $sce.trustAsResourceUrl('//fast.wistia.net/embed/iframe/' + $scope.videoObj.wistia)}];
        console.log($scope.videoObj.wistia);
      });
  }

  $scope.initialise();
});

app.filter("TrustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
       return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);