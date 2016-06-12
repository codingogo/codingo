module.exports= function(app){ 
  app.factory('Validator', ['$http', function ($http) {
    return {
      validateEmail: function (validate) {
        return $http({
          method: 'POST',
          data: validate,
          url: '/api/auth/v1/validate/email'
        });
      }
    };
  }])
};