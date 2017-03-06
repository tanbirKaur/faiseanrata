app.controller("signupUserController", ['toastr', '$scope', '$http', '$window', 'appConstants', function(toastr, $scope, $http, $window, appConstants){

		$scope.password = "";
		$scope.email = "";



//////////////////////////////
 

    var formdata = new FormData();
         //    formdata['target'] = "user";
          // formdata['id'] = "1";
         //    formdata.append("target", "user");
         //    formdata.append("id", "1");
            $scope.getTheFiles = function ($files) {
              // console.log("files");
              // console.log($files[0].name);

                angular.forEach($files, function (value, key) {
                    formdata.append(key, value);
                });
            };

            // NOW UPLOAD THE FILES.
            var uploadFiles = function (response) {
                var request = {
                    method: 'POST',
                    url: appConstants.apiUrl + 'Containers/faiseanrata/upload?target=user&id='+ String(response.data.id) +'&sub_id=0',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined
                    }
                };

                // console.log(request);

                // SEND THE FILES.
                $http(request)
                    .success(function (response1) {
                      // console.log("success uploading image",response1.result.files[0][0].providerResponse.location);
                      setTimeout(function(){
                        $window.location.href = "/login";
                      }, 1500);
                    })
                    .error(function (err) {
                      // console.log("error in uploading image");
                      // console.log(err);
                    });
            };



///////////////////////////


		
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

			// console.log($scope.data);

		$http.post(appConstants.apiUrl + "Clients/", $scope.data)
			.then(function(response){
				// console.log(response);
				// console.log("Succesfully registered form_data");
				uploadFiles(response);
				toastr.success("Succesfully Registered");
			},
			function(err){
				// console.log("error 2");
				// console.log(err);
				toastr.error("Error Occured");
			});
	};

}]);
