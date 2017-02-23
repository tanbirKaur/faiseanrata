app.controller("userProfileController", ['toastr', '$scope', '$window', '$http', 'appConstants', 'authService', function(toastr, $scope, $window, $http, appConstants, authService){

	if('access_token' in $window.localStorage)
		console.log("Access");
	else
		$window.location.href = "/";
	
	if('type' in $window.localStorage){
		$http.get(appConstants.apiUrl + 'Externals?filter[where][uid]='+$window.localStorage['id'])
		.then(function(response){
			console.log("Success", response.data[0]);
			$scope.reviewer = response.data[0];
			$scope.reviewer_email = JSON.parse($window.localStorage.currentUser).email;
			console.log($scope.reviewer_email);
		}, function(err){
			console.log("error", err);
			console.log(err);
		});
	}

	else{
		$http.get(appConstants.apiUrl + "Reviewers/" + $window.localStorage.userId)
		.then(function(response){
			console.log("Success", response.data);
			$scope.reviewer = response.data;
			$scope.reviewer_email = JSON.parse($window.localStorage.currentUser).email;
			console.log($scope.reviewer_email);
		}, function(err){
			console.log("error", err);
			console.log(err);
		});
	}

	// $http.get(appConstants.apiUrl + "Users/" + $window.localStorage.userId+ "?access_token="+$window.localStorage.access_token)
	// 	.then(function(response){
	// 		console.log("Success", response.data);
	// 		$scope.reviewer_email = response.data;
	// 	}, function(err){
	// 		console.log("error", err);
	// 		console.log(err);
	// 	});


	$scope.get_reviews = function(){

		if('type' in $window.localStorage)
			user = "Externals/";
		else
			user = "Reviewers/";

		$http.get(appConstants.apiUrl + user + $window.localStorage.userId + '/reviews?filter={"where":{"approved":1}, "order": "timestamp desc"}')
			.then(function(response){
				console.log("success", response.data);
				$scope.reviews = response.data;
			},function(err){
				console.log("err", err);
			});
	};

	$scope.get_designer_data = function(designerId, index){
		$scope.designer_details = [];
		$http.get(appConstants.apiUrl + "Designers/" + designerId)
			.then(function(response){
				console.log("Success", response.data);
				$scope.designer_details[index] = response.data;
			}, function(err){
				console.log("error", err);
			});
	};





	var formdata = new FormData();
         //    formdata['target'] = "user";
          // formdata['id'] = "1";
         //    formdata.append("target", "user");
         //    formdata.append("id", "1");
            $scope.getTheFiles = function ($files) {
              console.log("files");
              console.log($files[0].name);

                angular.forEach($files, function (value, key) {
                    formdata.append(key, value);
                });
            };


            // NOW UPLOAD THE FILES.
            var uploadFiles = function (response) {
      			
      			var target;

	            if('type' in $window.localStorage)
	            {
	            	id = String(response.data.id);
	            	target = 'external';
	            }
	           	else
	           	{
	           		id = String(response.data.userId);
	           		target = 'user';
	           	}

                var request = {
                    method: 'POST',
                    url: appConstants.apiUrl + 'Containers/faiseanrata/upload?target='+ target +'&id='+ id +'&sub_id=0',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined
                    }
                };

                console.log(request);

                // SEND THE FILES.
                $http(request)
                    .success(function (response1) {
                      console.log("success uploading image",response1.result.files[0][0].providerResponse.location);

                    })
                    .error(function (err) {
                      console.log("error in uploading image");
                      console.log(err);
                    });
            };





	$scope.save_changes = function(){
		console.log($scope.reviewer );
		console.log("PUT");
		if("type" in $window.localStorage)
		{
			$http.put(appConstants.apiUrl + "Externals/" + $window.localStorage.userId, $scope.reviewer)
				.then(function(response){
					console.log("scucces in changing data");
					console.log(response);
					toastr.success("Successfully edited data");
					uploadFiles(response);
				}, function(err){
					console.log("err in put");
					console.log(err);
				});
		}

		else
		{
			$http.put(appConstants.apiUrl + "Reviewers/" + $window.localStorage.userId, $scope.reviewer)
				.then(function(response){
					console.log("scucces in changing data");
					console.log(response);
					toastr.success("Successfully edited data");
					uploadFiles(response);
				}, function(err){
					console.log("err in put");
					console.log(err);
				});
		}
	};
	
}]);