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
    $scope.currentTabIndex = tabIndex;
    $scope.videoObj = $scope.filteredVideos[tabIndex];
    $scope.videoLink = [{url: $sce.trustAsResourceUrl('//fast.wistia.net/embed/iframe/' + $scope.videoObj.wistia)}];
  };

  var initialise = function(){
    $scope.currentTabIndex = 0;
    $scope.lessonId = $stateParams.lessonId;
    $scope.videoId = $stateParams;
  
    Lesson.get($stateParams.lessonId)
      .then(function(data){
        $scope.premium = data.data[0].premium;
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
        $scope.filteredVideos = result;
        $scope.videoObj = $scope.filteredVideos[0];
        $scope.videoLink = [{url: $sce.trustAsResourceUrl('//fast.wistia.net/embed/iframe/' + $scope.videoObj.wistia)}];
      });
  }

  initialise();
});