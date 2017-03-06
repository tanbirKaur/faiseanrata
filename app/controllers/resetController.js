app.controller('resetController', ['$stateParams', 'toastr', '$rootScope', '$scope', '$http', '$window', 'appConstants' , 'authService', 
	function($stateParams, toastr, $rootScope, $scope, $http, $window, appConstants, authService) {
		
    $scope.reset = function(){

      var data = {"email" : $scope.email};

      $http.post(appConstants.apiUrl+"/Clients/reset", data)
        .then(function(response){
          // console.log(response);
          toastr.info("Reset link sent to email");
        }, function(error){
          // console.log(error);
          toastr.error("Error in sending reset link."+error.data.error.message);
        });

    }
  
}]);
