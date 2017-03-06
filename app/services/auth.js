app.factory('authService', ['toastr', 'appConstants', '$http', '$window', '$q', '$rootScope',
    function(toastr, appConstants, $http, $window, $q, $rootScope) {
        //$rootScope.currentUser = {};
        function login(credentials) {


            $http.post(appConstants.apiUrl+"Clients/login", credentials)
                .then(function(response) {
                        console.log("Successful login request");
                        console.log("res1:")
                        console.log(response);

                        $window.localStorage['userId'] = response.data.userId;
                        $window.localStorage['access_token'] = response.data.id;


                        $http.get(appConstants.apiUrl+'Clients/'+ response.data.userId+ '?access_token='+response.data.id)
                            .then(function(res2) {
                                    console.log("res2");
                                    console.log(res2);
                                    $rootScope.currentUser = res2.data;
                                    $rootScope.logged_in = true;
                                    $window.localStorage['currentUser'] = JSON.stringify(res2.data);
                                    $window.location.href = '/profile-edit';

                                },
                                function(err){
                                    console.log("Error : "+JSON.stringify(err));
                                    $window.localStorage.clear();
                                    // alert ("Wrong email/password - error #0001 2nd api ");
                                    toastr.error("Wrong email/password");
                                });
                    },
                    function(err){
                        console.log("Error : "+err.data.error.message);
                        console.log(err);

                        if(err.data.error.message == "Email not verified")
                            toastr.error("Email not verified");
                        // alert ("Wrong email/password  - error #0002  1st api");
                        else
                            toastr.error("Wrong email/password");
                        $window.localStorage.clear();
                    });

        }

        function logout() {
            $http.post(appConstants.apiUrl+'users/logout'+'?access_token='+$window.localStorage['ec_access_token'])
                .then(function(response) {
                        console.log("Logout Successful");
                    },
                    function (err) {
                        console.log("Error in Logout -  - error #0003");
                    });
            $window.localStorage.clear();
            $window.location.href = '/';
        }

        function register(email, password) {
            return User
                .create({
                    email: email,
                    password: password
                })
                .$promise;
        }

        function checkLogin () {
            if($window.localStorage['ec_type'])
                return $window.localStorage['ec_type'];
            else
                return null;
        }


        return {
            login: login,
            logout: logout,
            register: register
        };
    }]);