app.controller('logoutController', ['$rootScope', '$scope', '$http', '$window', 'appConstants' , 'authService', 
	function($rootScope, $scope, $http, $window, appConstants, authService) {
		
		authService.logout();  
  
}]);