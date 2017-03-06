app.controller('eventsController', ['$stateParams', 'toastr', '$rootScope', '$scope', '$http', '$window', 'appConstants' , 'authService',
    function($stateParams, toastr, $rootScope, $scope, $http, $window, appConstants, authService) {


        $http.get(appConstants.apiUrl + 'Events?filter={"order":"timestamp asc"}')
            .then(function(response){
                // console.log("Fetched Events");
                // console.log(response.data);
                $scope.events = response.data;

                for(var i=0;i<$scope.events.length;i++){
                    get_designer_name($scope.events[i].designerId, i);
                }


            }, function(err){
                // console.log("err in events");
            });

        var get_designer_name = function(designerId, i){
            var name = "";
            $http.get(appConstants.apiUrl + '/Designers/' + designerId)
                .then(function(response){
                    name = response.data.name;
                    $scope.events[i].designerName = name;
                }, function(err){
                    // console.log(err);
                });
        };
    }]);
