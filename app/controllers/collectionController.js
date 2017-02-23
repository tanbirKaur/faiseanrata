app.controller('collectionController', ['$stateParams', 'toastr', '$rootScope', '$scope', '$http', '$window', 'appConstants' , 'authService', 
	function($stateParams, toastr, $rootScope, $scope, $http, $window, appConstants, authService) {
		

	$scope.modal_show = function(id){
		console.log("Hello");
		$("#myModal" + id).toggle();
	};

	var get_collection = function(){
		$http.get(appConstants.apiUrl + "Collections/" + $stateParams.collectionId + "/designs")
		.then(function(response){
			$scope.designs = response.data;
			console.log(response);
			console.log("success fetching image");
		}, function(err){
			console.log("Error fetching image");
		});

	};

	get_collection();


	$scope.like_design = function(index){
		var data = {
			"designId" : $scope.designs[index].id,
			"type" : "reviewer",
			"viewerId" : $window.localStorage.userId
		};

		if("type" in $window.localStorage)
			data.type = "external";

		$http.post(appConstants.apiUrl + "Designs/like", data)
			.then(function(response){
				console.log(data);
				get_collection();
				console.log("Liked Design Successfully");
			}, function(err){
				console.log("Error in liking design");
				console.log(err);
			});
	};

	$scope.liked = [];

	$scope.check_like = function(index){
		console.log("index", index);		
		if($scope.designs[index].likers.external.indexOf(parseInt($window.localStorage['userId'])) >=0 || $scope.designs[index].likers.reviewer.indexOf(parseInt($window.localStorage['userId'])) >=0)
		{
			$scope.liked[index] = true;
			console.log("index", index);
			console.log("liked", true);
		}
	};


	$(".fancybox").fancybox({
        beforeShow: function () {
            if (this.title) {
                // New line
                this.title += '<br />';
                
                // Add tweet button
                console.log("Get index");
                var index = this.element[0].attributes[0].value;
                console.log(index);
                $rootScope.new = "Hello";
                this.title += '';
                
                // Add FaceBook like button
                this.title += '<iframe src="//www.facebook.com/plugins/like.php?href=' + this.href + '&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:110px; height:23px;" allowTransparency="true"></iframe>';
            }
        },
        afterShow: function() {
            // Render tweet button
            twttr.widgets.load();
        },
        helpers : {
            title : {
                type: 'inside'
            }
        }  
    });

   	$rootScope.test1 = function(){
		console.log("Hello");
	};


}]);
