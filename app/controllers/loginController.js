app.controller('loginController', ['$stateParams', 'toastr', '$rootScope', '$scope', '$http', '$window', 'appConstants' , 'authService', 
	function($stateParams, toastr, $rootScope, $scope, $http, $window, appConstants, authService) {
		
    if($stateParams.flag == 1)
      toastr.success("Confirmed Email");
    else if($stateParams.flag == 2)
      toastr.success("Password Reset Successful");

		var demoCredentials = {
			'email' : 'shubham@partiko.com',
			'password' : 'password'
		};

		$scope.login = function() {
	
			var credentials = {
				'email' : $scope.email,
				'password' : $scope.password
		}
		
		authService.login(credentials);
		
	};

	// function onSignIn(googleUser) {
 //        // Useful data for your client-side scripts:
 //        var profile = googleUser.getBasicProfile();
 //        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
 //        console.log('Full Name: ' + profile.getName());
 //        console.log('Given Name: ' + profile.getGivenName());
 //        console.log('Family Name: ' + profile.getFamilyName());
 //        console.log("Image URL: " + profile.getImageUrl());
 //        console.log("Email: " + profile.getEmail());

 //        // The ID token you need to pass to your backend:
 //        var id_token = googleUser.getAuthResponse().id_token;
 //        console.log("ID Token: " + id_token);
 //      };

var data = {}

    gapi.load('auth2', function() {//load in the auth2 api's, without it gapi.auth2 will be undefined
        gapi.auth2.init(
                {
                    client_id: '183206614956-p5au8me04su1sbq95dfouhoj6d1vsi9h.apps.googleusercontent.com'
                }
        );
        var GoogleAuth  = gapi.auth2.getAuthInstance();//get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
        $scope.onLogInButtonClick=function(){//add a function to the controller so ng-click can bind to it
            GoogleAuth.signIn().then(function(response){//request to sign in
                console.log(response);

                data.name =  response.w3.ig;
                data.uid = "google" + response.w3.Eea;
                data.image_url = response.w3.Paa;
                data.email = response.w3.U3;

                console.log(data);

                $http.get(appConstants.apiUrl + 'Externals?filter[where][uid]='+data.uid)
                	.then(function(response2){

                		$window.localStorage['currentUser'] = JSON.stringify(data);
		    			$window.localStorage['id'] = data.uid;
		    			$window.localStorage['access_token'] = "";    
		                $window.localStorage['type'] = "external";


                		if(response2.data.length == 0)
                		{
                			console.log("Not Exist");

                			$http.post(appConstants.apiUrl + "Externals/", data)
			                	.then(function(response1){
			                		toastr.success("Successfully logged in");
			                		// console.log(response1);
                          $window.localStorage['userId'] = response1.data.id;
					                $window.location.href = "/profile-edit";

			                	}, function(err1){
			                		// console.log("Error in Login PUT");
			                		toastr.error("Error in Login");
			            			// console.log(err1);
			                		$window.localStorage.clear();
			                	});
                		}

                		else
                		{
                			// console.log("Exist");
                			toastr.success("Successfully logged in");
                      $window.localStorage['userId'] = response2.data[0].id;
			                $window.location.href = "/profile-edit";
                		}
                	}, function(err2){
                		// console.log("Error in Social Login GET");
                		toastr.error("Error in Login");
            			// console.log(err2);
                		$window.localStorage.clear();
                	});

            });
        };
    });


	$scope.logout = function() {
		authService.logout();
	};


 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    // console.log('statusChangeCallback');
    // console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.


function facebookInit() {
   // do what you would like here

     window.fbAsyncInit = function() {
  FB.init({
    appId      : '1138328379582618',
    cookie     : false,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


}

facebookInit();
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.

  function testAPI() {
    FB.api('/me?scope=email', function(response) {
		// console.log(response);
		// console.log('Successful login for: ' + response.name);
		data.name = response.name;
		data.uid = "fb" + response.id;
		data.email = "";
    
	    FB.api('/me/picture?height=150&width:150', function(response) {
			// console.log(response);
			// console.log("picture");
			data.image_url = response.data.url;
		

			$http.get(appConstants.apiUrl + 'Externals?filter[where][uid]='+data.uid)
            	.then(function(response2){

            		$window.localStorage['currentUser'] = JSON.stringify(data);
	    			$window.localStorage['id'] = data.uid;
	    			$window.localStorage['access_token'] = "";    
	                $window.localStorage['type'] = "external";
                  // console.log("response2");
                  // console.log(response2.data);

            		if(response2.data.length == 0)
            		{
            			// console.log("Not Exist");
            			$http.post(appConstants.apiUrl + "Externals/", data)
		                	.then(function(response1){
		                		toastr.success("successfully logged in PUT");
		                		// console.log(response1);
                        $window.localStorage['userId'] = response1.data.id;
				                $window.location.href = "/profile-edit";

		                	}, function(err1){
		                		// console.log("Error in Social Login PUT");
		                		toastr.error("Error in Login");
		            			// console.log(err1);
		                		$window.localStorage.clear();
		                	});
            		}

            		else
            		{
            			// console.log("Exist");
            			toastr.success("successfully logged in GET");
                  $window.localStorage['userId'] = response2.data[0].id;
		                $window.location.href = "/profile-edit";
            		}
            	}, function(err2){
            		// console.log("Error in Social Login GET");
            		toastr.error("Error in Login");
        			// console.log(err2);
            		$window.localStorage.clear();
            	});

	    });

    });

    // console.log(data);

  }

  $scope.fbLogin = function()
    {

    // 	facebookInit();

    // 	 FB.getLoginStatus(function(response) {
    // 		statusChangeCallback(response);
 		 // });
        FB.login(function(response) 
        {
           if (response.authResponse) 
           {
             // console.log('Welcome!  Fetching your information.... ');
             var access_token = response.authResponse.accessToken;
             // console.log(response.authResponse);

             testAPI();
           } 
           else 
           {
             // console.log('User cancelled login or did not fully authorize.');
           }
         });
    };


  
}]);
