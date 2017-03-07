app.controller("signupUserController", ['toastr', '$scope', '$http', '$window', 'appConstants', function(toastr, $scope, $http, $window, appConstants){
		$scope.password = "";
		$scope.email = "";
    var formdata = new FormData();
            $scope.getTheFiles = function ($files) {
                angular.forEach($files, function (value, key) {
                    formdata.append(key, value);
                });
            };
            var uploadFiles = function (response) {
                var request = {
                    method: 'POST',
                    url: appConstants.apiUrl + 'Containers/faiseanrata/upload?target=user&id='+ String(response.data.id) +'&sub_id=0',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined
                    }
                };
                $http(request)
                    .success(function (response1) {

                      setTimeout(function(){
                        $window.location.href = "/login";
                      }, 1500);
                    })
                    .error(function (err) {

                    });
            };

	$scope.submit1 = function(){
		$scope.data = {
			"username": String($scope.email),
			"email":String($scope.email),
      "first_name": String($scope.fname),
      "last_name": String($scope.lname),
			"password":String($scope.password),
      "dob" : String($scope.dob),
      "location" : String($scope.location),
			};



		$http.post(appConstants.apiUrl + "Clients/", $scope.data)
			.then(function(response){

				uploadFiles(response);
				toastr.success("Succesfully Registered");
			},
			function(err){

				toastr.error("Error Occured");
			});
	};

}]);
