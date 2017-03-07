app.controller('usefulController', ['toastr', '$stateParams', '$rootScope', '$scope', '$http', '$window', 'appConstants' , 'authService',
    function(toastr, $stateParams, $rootScope, $scope, $http, $window, appConstants, authService) {

        $scope.param = $stateParams.param;

        $scope.contact_submit = function(){
            data = {
                "name" : $scope.name,
                "email" : $scope.email,
                "subject" : $scope.subject,
                "message" : $scope.msg
            };



            $http.post("http://faiseanrata.com:5678/contact-form", data)
                .then(function(response){
                    toastr.success("Query Submitted. We will contact you soon");
                }, function(err){

                    toastr.error("Error Submitting Query. Please try again Later");
                });
        };


    }]);
