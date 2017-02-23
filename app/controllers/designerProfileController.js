app.controller('designerProfileController', ['$rootScope', 'toastr', '$scope', '$window','$http', 'appConstants', '$stateParams', function($rootScope, toastr, $scope, $window, $http, appConstants, $stateParams){
	
	$scope.id = $stateParams.id;

	$scope.click1 = function (param) {
        //console.log('Click(' + param + ')');
    };

    $scope.mouseHover1 = function (param) {
        //console.log('mouseHover(' + param + ')');
        $scope.hoverRating1 = param;
    };

    $scope.mouseLeave1 = function (param) {
        //console.log('mouseLeave(' + param + ')');
        $scope.hoverRating1 = param + '*';
    };

    $scope.starRating1 = 0;
    $scope.hoverRating1 = 0;


    var get_rating = function(){
    	var type = "Reviewers/"; 

		if('type' in $window.localStorage)
			type = "Externals/";

		$http.get(appConstants.apiUrl + type + $window.localStorage.userId +'/reviews?filter={"where":{"designerId":'+ $stateParams.id + '}}')
			.then(function(response){
				console.log("GET");
				console.log(response.data);

				if(response.data.length > 0)
				{
					$scope.starRating1 = parseInt(response.data[0].rating);
					$scope.hoverRating1 = parseInt(response.data[0].rating);
					$scope.review_text = response.data[0].content;
					console.log($scope.starRating1);
					
				}

				else
				{
					$scope.starRating1 = 0;
					$scope.hoverRating1 = 0;
					$scope.review_text = "";
				}


				console.log("Star rating get");
			
			// mouseHover1($scope.starRating1);

			}, function(err){
				console.log("error GET");
				console.log(err);
			});
    };


    get_rating();

	$scope.get_submit_review = function(){

		var type = "Reviewers/"; 

		if('type' in $window.localStorage)
			type = "Externals/";

		$http.get(appConstants.apiUrl + type + $window.localStorage.userId +'/reviews?filter={"where":{"designerId":'+ $stateParams.id + '}}')
			.then(function(response){
				console.log("GET");
				console.log(response.data);

				if(response.data.length > 0)
				{
					$scope.starRating1 = parseInt(response.data[0].rating);
					$scope.hoverRating1 = parseInt(response.data[0].rating);
					$scope.review_text = response.data[0].content;
					console.log($scope.starRating1);
					
				}

				else
				{
					$scope.starRating1 = 0;
					$scope.hoverRating1 = 0;
					$scope.review_text = "";
				}

			}, function(err){
				console.log("error GET");
				console.log(err);
			});
	};




   	function get_similar_designers(){
		$http.get(appConstants.apiUrl + '/Designers?filter={"where":{"type":"'+ $scope.data.type + '","limit":4}}')
			.then(function(response){
				$scope.similars = response.data;
				console.log("similar");
				console.log($scope.similars);
			}, function(err){
				console.log(err);
				console.log("Error similar");
			});
	}

	function get_no_of_reviews(){
		$http.get(appConstants.apiUrl + 'Reviews/count?where={"designerId":'+ $stateParams.id +',"content":{"nlike":""},"approved":true}')
			.then(function(response){
				console.log('/Reviews/count?filter={"where":{"designerId":'+ $stateParams.id +',"content":{"nlike":""},"approved":"true"}}');
				$scope.no_of_reviews = response.data.count;
				console.log("NO OF REVIEWS", response.data.count);
			});
	}

	get_no_of_reviews();

	$http.get(appConstants.apiUrl + 'Designers/' + $stateParams.id)
		.then(function(response){
			console.log("in api");
			console.log(response.data);
			$scope.data = response.data;

			get_similar_designers();

			$http.get(appConstants.apiUrl + 'Designers/' + $stateParams.id+"/categories")
				.then(function(response2){
					console.log("category added");
					$scope.categories = response2.data;
					console.log(response2.data);
				}, function(err2){
					console.log("error in category adding", err2);
				});

		},function(err){
			console.log("Error Occured");
			$window.location.href="/";
			}
		);

		$scope.review_submit = function(flag){
		
			var message = "Review Submitted";		
			var type = "Reviewers/";

			if('type' in $window.localStorage)
				type = "Externals/";

			if($window.localStorage.userId == undefined)
			{
				toastr.info("You need to login first");
				return;
			}	

			$http.get(appConstants.apiUrl + type + $window.localStorage.userId +'/reviews?filter={"where":{"designerId":'+ $stateParams.id + '}}')
				.then(function(response){
					console.log("GET");
					console.log(response.data);


					if(response.data.length > 0)
					{
						var data = {
							"new_content": $scope.review_text,
						  	"new_rating": parseFloat(parseFloat($scope.starRating1).toFixed(1)),
						  	"designerId": parseInt($stateParams.id),
						  	"reviewerId": parseInt($window.localStorage.userId),
						  	"type" : "reviewer"
						};

						if('type' in $window.localStorage)
							data.type = "external";

						if(flag == 0){
							data["new_content"] = response.data[0].content;
							console.log("Only Rating");
							message = "Rating Submitted";
						}

						console.log("data", data);		
						console.log(appConstants.apiUrl + 'Reviews/edit');
						$http.post(appConstants.apiUrl + 'Reviews/edit', data)
							.then(function(response2){
								console.log(response2);
								console.log("Review Edited");
								toastr.success(message);
							},function(err2){
								console.log("err");
								console.log(err2);
								toastr.error("Error Submitting Review");
							});
					}

					else
					{
						var data = {
							"content": $scope.review_text,
						  	"rating": parseFloat(parseFloat($scope.starRating1).toFixed(1)),
						  	"designerId": parseInt($stateParams.id),
						};

						if(flag == 0){
							data["content"] = "";
							console.log("Only Rating");
							message = "Rating Submitted";
						}


						console.log("data", data);		
						console.log(appConstants.apiUrl + 'Reviews');
						$http.post(appConstants.apiUrl + type + $window.localStorage.userId + '/reviews', data)
							.then(function(response2){
								console.log(type + $window.localStorage.userId + '/reviews');
								console.log(response2);
								console.log("Review Added");
								toastr.success(message);
							},function(err2){
								console.log("err");
								console.log(err2);
								toastr.error("Error Submitting Review");
							});
					}
				}, function(err){
					console.log("error GET");
					console.log(err);
				});

	};

	$scope.get_reviews = function(){
		$http.get(appConstants.apiUrl + "Designers/" + $stateParams.id + '/reviews?filter={"where":{"approved":1}, "order": "timestamp desc"}')
			.then(function(response){
				console.log("Success Fetching  the reviews");
				$scope.reviews = response.data;
				console.log($scope.reviews);
			},function(err){
				console.log("err");
				console.log(err);
			});
	};


	$scope.get_reviewer_data = function(reviewerId, externalId , index){
		$scope.reviewer_details = [];

		$http.get(appConstants.apiUrl + "Reviewers/" + reviewerId)
			.then(function(response){
				console.log("Success", response.data);
				$scope.reviewer_details[index] = response.data;

			}, function(err){
				console.log("error", err);

				$http.get(appConstants.apiUrl + "Externals/" + externalId)
					.then(function(response1){
						console.log("Success", response1.data);
						$scope.reviewer_details[index] = response1.data;

					}, function(err1){
						console.log("error", err1);
						toastr.error("Error Occured");
					});

			});
	};

	$scope.get_collections = function(){
		$http.get(appConstants.apiUrl + "Designers/" + $stateParams.id + "/collections")
			.then(function(response){
				console.log("Fetched Collections");
				$scope.collections = response.data;
				console.log(response.data);

			}, function(err){
				console.log("err in collections");
			});
	};


	$scope.get_events = function(){
		$http.get(appConstants.apiUrl + "Designers/" + $stateParams.id + '/events?filter={"order":"name desc"}')
			.then(function(response){
				console.log("Fetched Events");
				console.log(response.data);
				$scope.events = response.data;

			}, function(err){
				console.log("err in events");
			});
	};

	$scope.image_id = []

	$scope.get_collection_pic = function(collectionId, index){
		console.log("Getting pic");
		console.log(collectionId);
		$http.get(appConstants.apiUrl + "Collections/" + collectionId + "/designs")
			.then(function(response){
				$scope.image_id[index] = response.data[0].image_url;
				console.log(response.data);
				console.log("success fetching image");
			}, function(err){
				console.log("Erro fetching image");
			});

		console.log($scope.image_id[index], "image_id");
	};

}]);