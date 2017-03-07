app.controller("userProfileController", ['toastr', '$scope', '$window', '$http', 'appConstants', 'authService', function(toastr, $scope, $window, $http, appConstants, authService){

    if('!access_token' in $window.localStorage)
        $window.location.href = "/";


    if('type' in $window.localStorage){
        $http.get(appConstants.apiUrl + 'Externals?filter[where][uid]='+$window.localStorage['id'])
            .then(function(response){

                $scope.reviewer = response.data[0];
                $scope.reviewer_email = JSON.parse($window.localStorage.currentUser).email;

            }, function(err){

            });
    }

    else{
        $http.get(appConstants.apiUrl + "Reviewers/" + $window.localStorage.userId)
            .then(function(response){

                $scope.reviewer = response.data;
                $scope.reviewer_email = JSON.parse($window.localStorage.currentUser).email;
                console.log($scope.reviewer_email);
            }, function(err){

            });
    }



    $scope.get_reviews = function(){

        if('type' in $window.localStorage)
            user = "Externals/";
        else
            user = "Reviewers/";

        $http.get(appConstants.apiUrl + user + $window.localStorage.userId + '/reviews?filter={"where":{"approved":1}, "order": "timestamp desc"}')
            .then(function(response){

                $scope.reviews = response.data;
            },function(err){

            });
    };

    $scope.get_designer_data = function(designerId, index){
        $scope.designer_details = [];
        $http.get(appConstants.apiUrl + "Designers/" + designerId)
            .then(function(response){

                $scope.designer_details[index] = response.data;
            }, function(err){

            });
    };





    var formdata = new FormData();

    $scope.getTheFiles = function ($files) {


        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };



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


        $http(request)
            .success(function (response1) {


            })
            .error(function (err) {

            });
    };





    $scope.save_changes = function(){

        if("type" in $window.localStorage)
        {
            $http.put(appConstants.apiUrl + "Externals/" + $window.localStorage.userId, $scope.reviewer)
                .then(function(response){

                    toastr.success("Successfully edited data");
                    uploadFiles(response);
                }, function(err){

                });
        }

        else
        {
            $http.put(appConstants.apiUrl + "Reviewers/" + $window.localStorage.userId, $scope.reviewer)
                .then(function(response){

                    toastr.success("Successfully edited data");
                    uploadFiles(response);
                }, function(err){

                });
        }
    };

}]);