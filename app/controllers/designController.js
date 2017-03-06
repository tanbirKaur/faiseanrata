app.controller('designController', ['$stateParams', 'toastr', '$rootScope', '$scope', '$http', '$window', 'appConstants' , 'authService',
	function($stateParams, toastr, $rootScope, $scope, $http, $window, appConstants, authService) {
		
		var view_design = function(){

		};

		var get_design = function(){

			$http.get(appConstants.apiUrl + "/Designs/" + $stateParams.designId)
				.then(function(response){
					// console.log("Success");
					$scope.data = response.data;
					//console.log(response.data);
				}, function(error){
					//console.log("Error");
					//console.log(err);
				});

		};

		get_design();
		view_design();

}]);
