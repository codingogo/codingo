// Profile Page
app.controller('ProfileCtrl', function($scope){
  $scope.currentTabIndex = 0;
  
  $scope.showTab = function(tabIndex){
    $scope.currentTabIndex = tabIndex;
  };

});