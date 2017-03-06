app.controller("indexController", ['$window', '$rootScope', '$state', '$scope', '$http', 'appConstants', function($window, $rootScope, $state, $scope, $http, appConstants){

	if('no' in $window.localStorage)
	{
		console.log("in");
		if($window.localStorage.no == "0")
		{

			$window.localStorage.no =1;
			location.reload();
		}

		else{
			console.log("pass");
			$window.localStorage.no = 0;
		}
	}

	else
	{
		console.log("not in");
		$window.localStorage.no =1;
		location.reload();
	}

	console.log("hi");

	$rootScope.$state = $state;

	function get_no_of_reviews(index){
		$http.get(appConstants.apiUrl + 'Reviews/count?where={"designerId":'+ $stateParams.id +',"content":{"nlike":""},"approved":true}')
			.then(function(response){
				// console.log('/Reviews/count?filter={"where":{"designerId":'+ $stateParams.id +',"content":{"nlike":""},"approved":"true"}}');
				$scope.no_of_reviews = response.data.count;
				// console.log("NO OF REVIEWS", response.data.count);
			});
	}



	$http.get(appConstants.apiUrl + "Designers/trending")
		.then(function(response){
				// console.log("Trending Designers");
				// console.log(response.data);
				$scope.trending_designers = response.data.data;
			}, function(err){
				// console.log("Error in Trending Designers");
			});

	$http.get(appConstants.apiUrl + 'Designers?filter={"order":"overall_rating desc","limit":12}')
		.then(function(response){
			// console.log("Top Designers");
			// console.log(response.data);
			$scope.top_designers = response.data;
		}, function(err){
			// console.log("Error Top Designers");
			// console.log(err);
		});

	$http.get(appConstants.apiUrl + 'Reviewers/top?filter={"order":"points","limit":12}')
		.then(function(response){
			// console.log("Top Reviewers");
			// console.log(response.data.result);
			$scope.top_reviewers = response.data.result;
		}, function(err){
			// console.log("Error Top Reviewers");
			// console.log(err);
		});

	$http.get(appConstants.apiUrl + 'Reviewers/recent')
	.then(function(response){
		// console.log("Recent Reviewer");
		// console.log(response.data.result);
		$scope.recent_reviewers = response.data.result;
	}, function(err){
		// console.log("Error Recent Reviewers");
		// console.log(err);
	});


	$http.get(appConstants.apiUrl + 'Designers?filter={"order":"id desc","limit":12}')
		.then(function(response){
			// console.log("Recent Designers");
			// console.log(response.data);
			$scope.recent_designers = response.data;
		}, function(err){
			// console.log("Error Recent Designers");
			// console.log(err);
		});


	$http.get(appConstants.apiUrl + 'Designs?filter={"order":"likes desc","limit":12}')
		.then(function(response){

			// console.log("Trending Designs New");
			$scope.trending_designs = response.data;
			for(var i=0;i<$scope.trending_designs.length;i++){
				get_designer_name_trending($scope.trending_designs[i].collectionId, i);
			}

			// console.log($scope.trending_designs);

		}, function(err){
			// console.log("Error Trending Designs");
			// console.log(err);
		});

		$http.get(appConstants.apiUrl + 'Designs?filter={"order":"id desc","limit":12}')
		.then(function(response){
			// console.log("Recent Designs");
			$scope.recent_designs = response.data;
			for(var i=0;i<$scope.recent_designs.length;i++){
				get_designer_name_recent($scope.recent_designs[i].collectionId, i);
			}

			console.log($scope.recent_designs);

		}, function(err){
			// console.log("Error Recent Designs");
			// console.log(err);
		});



		$scope.keyword = "";

		$scope.search = function(){
			$state.go('designers', {keyword : $scope.keyword});
		}

		var get_designer_name_trending = function(collectionId, i){
			var name = "";
			$http.get(appConstants.apiUrl + '/Collections/' + collectionId + '/designer')
				.then(function(response){
					name = response.data.name;
					$scope.trending_designs[i].name = name;
				}, function(err){
					// console.log(err);
				});
		};

		var get_designer_name_recent = function(collectionId, i){
			var name = "";
			$http.get(appConstants.apiUrl + '/Collections/' + collectionId + '/designer')
				.then(function(response){
					name = response.data.name;
					$scope.recent_designs[i].name = name;
				}, function(err){
					// console.log(err);
				});
		};

}]);