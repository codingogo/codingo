module.exports= function(app){ 
  app.factory('Blog', function($q, $stamplay, $http){
    function all() {
      var def = $q.defer();

      Stamplay.Object("blog").get({}, function(err, res){
        if(err) return err;
        def.resolve(res);
      })
      return def.promise;
    };

    function get(id) {
      var def = $q.defer();

      Stamplay.Object('blog').get({_id: id}, function(err, res){
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