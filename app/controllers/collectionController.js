app.controller('collectionController', ['$stateParams', 'toastr', '$rootScope', '$scope', '$http', '$window', 'appConstants' , 'authService',
    function($stateParams, toastr, $rootScope, $scope, $http, $window, appConstants, authService) {


        $scope.modal_show = function(id){

            $("#myModal" + id).toggle();
        };

        var get_collection = function(){
            $http.get(appConstants.apiUrl + "Collections/" + $stateParams.collectionId + "/designs")
                .then(function(response){
                    $scope.designs = response.data;

                }, function(err){

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

                    get_collection();

                }, function(err){

                });
        };

        $scope.liked = [];

        $scope.check_like = function(index){

            if($scope.designs[index].likers.external.indexOf(parseInt($window.localStorage['userId'])) >=0 || $scope.designs[index].likers.reviewer.indexOf(parseInt($window.localStorage['userId'])) >=0)
            {
                $scope.liked[index] = true;

            }
        };






    }]);
