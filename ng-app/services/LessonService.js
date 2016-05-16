module.exports= function(app){ 
  app.factory('Lesson', function($q, $stamplay, $http){
    function all() {
      var def = $q.defer();

      Stamplay.Object("lesson").get({}, function(err, res){
        if(err) return err;
        def.resolve(res);
      })
      return def.promise;
    };

    function get(id) {
      var def = $q.defer();

      Stamplay.Object('lesson').get({_id: id}, function(err, res){
        if(err) return err;
        def.resolve(res);
      })

      return def.promise;
    };

    return {
      all: all,
      get: get
    }
  });
}