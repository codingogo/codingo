app.controller('accountCtrl', ['AccountService', '$scope', '$rootScope', function(AccountService, $scope, $rootScope){
    $scope.login = function() {
      AccountService.login();
    }

    $scope.logout = function() {
      AccountService.logout();
    }
}])