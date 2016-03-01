app.controller('LessonsCtrl', function($scope, $rootScope, $stamplay, Lesson){
  $scope.lessons = [];
  
  var loadLessons = function(){
    Lesson.all().then(function(lessons){
      var lessonsObj = lessons;

      for(var key in lessonsObj) {
        var valueObj = {
          instance: lessonsObj[key].instance
        };
        $scope.lessons.push(valueObj);
      }
    })
  };

  loadLessons();
});

app.controller('LessonCtrl', function($scope, $stateParams, Lesson){

  $scope.currentTabIndex = 0;
  
  $scope.showTab = function(tabIndex) {
    $scope.currentTabIndex = tabIndex;
    console.log(tabIndex);
    $scope.videoFile = $scope.lessonFile[tabIndex];
    console.log($scope.videoFile);
  };

  $scope.lessonId = $stateParams.lessonId;
  
  var lesson = this;
  Lesson.get($stateParams.lessonId)
    .then(function(data){
      $scope.lessonObj = data.instance;
  });

  $scope.lessonFile = [
    {title: 'First Chapter', sectionId: 0, videoLink:'./ng-app/assets/images/sample.jpg', description: 'this is the first video'}, 
    {title: 'Second Chaper', sectionId: 1, videoLink: './ng-app/assets/images/sample2.jpg', description: 'this is the second video'}, 
    {title: 'Third Chapter', sectionId: 2, videoLink: './ng-app/assets/images/sample3.jpg', description: 'this is a video'}
  ];
  
  $scope.videoFile = $scope.lessonFile[0];


});