module.exports= function(app){ 
  app.factory('Video', function($q, $stamplay, $http){
    function all() {
      var def = $q.defer();

      Stamplay.Object("video").get({}, function(err, res){
        if(err) return err;
        def.resolve(res);
      })
      return def.promise;
    }

    function get(id) {
      var def = $q.defer();

      Stamplay.Object('video').get({}, function(err, res){
        if(err) return err;
        def.resolve(res);
      })
      return def.promise;
    }

    function query(obj) {
      var def = $q.defer();

      Stamplay.Object('video').get(obj, function(err, res){
        if(err) return err;
        def.resolve(res);
      })
      return def.promise;
    }

    return {
      all: all,
      get: get,
      query: query
    }
  });
};