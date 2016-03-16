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
      $scope.lessons = lessons.data;
    })
  };

  initialise();
});

app.controller('LessonCtrl', function($scope, $stateParams, Lesson, Video){
// console.log($stateParams);
  $scope.currentTabIndex = 0;
  if($scope.filteredVideos){
    $scope.videoFile = $scope.filteredVideos[0];
  };
  $scope.showTab = function(tabIndex) {
    $scope.currentTabIndex = tabIndex;
    // $scope.videoFile = $scope.lessonFile[tabIndex];
    $scope.videoFile = $scope.filteredVideos[tabIndex];
  };

  $scope.lessonId = $stateParams.lessonId;

  var lesson = this;
  Lesson.get($stateParams.lessonId)
    .then(function(data){
      console.log('data', data.data[0]);
      $scope.premium = data.data[0].premium;
      console.log('premium', $scope.premium);
      $scope.lessonObj = data.data[0];
  });

  $scope.videoId = $stateParams;
  // console.log('lessonId', $stateParams);

  Video.get($stateParams)
    .then(function(data){
      var obj = data.data;
      var result = obj.filter(function(val){
        return val.lesson_id == $stateParams.lessonId;
      })
      console.log('result', result);
      $scope.filteredVideos = result;
      $scope.videoFile = $scope.filteredVideos[0];
      // console.log('filteredVideos', $scope.filteredVideos);
    });

});