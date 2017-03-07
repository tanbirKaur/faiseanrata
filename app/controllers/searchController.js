app.controller("searchController", ['$rootScope', '$state', '$stateParams', '$scope', '$window', '$http', 'appConstants', function($rootScope, $state, $stateParams, $scope, $window, $http, appConstants){


	 $rootScope.$state = $state;
	 $scope.isMobile = false;


    $scope.showFilter = function () {
        $('#filterDiv').show();
        $('#clearFilterlink').show();
        $('#applyFilterlink').hide();
        $scope.isMobile = true;
    }

    $scope.clearFilterLink = function () {
        $('#filterDiv').hide();
        $('#clearFilterlink').hide();
        $('#applyFilterlink').show();

    }

	$scope.search = function(keyword){


		$scope.filter = {

		};

		if($scope.keyword == undefined)
		{
			$scope.keyword = "";
		}
		if($scope.category == undefined)
		{
			$scope.category = "none";
		}
		if($scope.location == undefined)
		{
			$scope.location = "none";
		}
		if($scope.sex == undefined)
		{
			$scope.sex = "none";
		}
		if($scope.rating == undefined)
		{
			$scope.rating = "none";
		}



		if(keyword == undefined)
			keyword = $scope.keyword;
		else
			$scope.keyword = keyword;
		

		$scope.data = {
			"name" : keyword,
			"category" : $scope.category,
			"location" : $scope.location,
			"rate_flow" : $scope.rating,
			"sex" : $scope.sex
		};


		$http.get(appConstants.apiUrl + 'Designers/search?data='+JSON.stringify($scope.data))
			.then(function(response){

				$scope.designers = response.data.result;

			}, function(err){

			});

		if($scope.isMobile){
            $scope.clearFilterLink();
        }

	};


	$scope.search($stateParams.keyword);

}]);