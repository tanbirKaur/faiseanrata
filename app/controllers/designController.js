app.controller('designController', ['$stateParams', 'toastr', '$rootScope', '$scope', '$http', '$window', 'appConstants' , 'authService',
	function($stateParams, toastr, $rootScope, $scope, $http, $window, appConstants, authService) {
		
		var view_design = function(){

		};

		var get_design = function(){

			$http.get(appConstants.apiUrl + "/Designs/" + $stateParams.designId)
				.then(function(response){

					$scope.data = response.data;

				}, function(error){

				});

		};

		get_design();
		view_design();

}]);
