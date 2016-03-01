app.factory('Lesson', function($q, $stamplay, $http){

  function all() {
    var def = $q.defer();

    var LessonCollection = new Stamplay.Cobject('lesson').Collection;
    LessonCollection.populate().fetch().then(function(){
      def.resolve(LessonCollection.instance);
    });

    return def.promise;
  }

  function get(id) {
    var def = $q.defer();

    var lesson = new Stamplay.Cobject('lesson').Model;

    lesson.fetch(id)
      .then(function(){
        def.resolve(lesson);
      });

    return def.promise;
  }

  return {
    all: all,
    get: get
  }
});