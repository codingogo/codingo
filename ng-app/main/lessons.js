app.controller('LessonsCtrl', function($scope, $rootScope, $stamplay, Lesson, UserStatus){
  $scope.lessons = [];
  
  var initialise = function(){
    loadLessons();
    getUser();
  }

  var getUser = function(){
    UserStatus.getUser()
    .then(function(res){
      // console.log('user', res);
    });
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

    window._wq = window._wq || [];
    _wq.push({ "_all": function(video) {
      video.play();
    }});

    // video next and previous buttons
    if ($scope.filteredVideos[tabIndex + 1] === undefined){
      $scope.allowNextBtn = false;
    } else {
      $scope.allowNextBtn = true;
    }
    if($scope.filteredVideos[tabIndex - 1] === undefined){
      $scope.allowPreviousBtn = false;
    } else {
      $scope.allowPreviousBtn = true;
    }
  };

  $scope.nextVideo = function(index){
    if($scope.filteredVideos[index + 1] !== undefined){
      $scope.videoObj = $scope.filteredVideos[index + 1];
    } 
    if ($scope.filteredVideos[index + 2] === undefined){
      $scope.allowNextBtn = false;
    }
    if($scope.videoLink !== undefined){
      $scope.videoLink = [{url: $sce.trustAsResourceUrl('//fast.wistia.net/embed/iframe/' + $scope.videoObj.wistia)}];
      $scope.allowPreviousBtn = true;
    }
  };

  $scope.previousVideo = function(index){
    $scope.allowNextBtn = true;
    $scope.videoObj = $scope.filteredVideos[index - 1];
    if($scope.videoObj !== undefined){
      $scope.videoLink = [{url: $sce.trustAsResourceUrl('//fast.wistia.net/embed/iframe/' + $scope.videoObj.wistia)}];
      $scope.allowPreviousBtn = true;
    };
    if($scope.filteredVideos[index - 2] === undefined){
      $scope.allowPreviousBtn = false;
    }  
  };

  var initialise = function(){
    $scope.currentTabIndex = 0;
    $scope.lessonId = $stateParams.lessonId;
    $scope.videoId = $stateParams;
    $scope.allowNextBtn = true;
    $scope.allowPreviousBtn = false;
  
    Lesson.get($stateParams.lessonId)
      .then(function(data){
        console.log(data);
        $scope.premium = data.data[0].premium;
        $scope.lessonObj = data.data[0];
        $scope.comments = data.data[0].actions.comments;
    });

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