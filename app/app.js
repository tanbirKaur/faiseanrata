var app = angular.module("faiseanrata", ['ui.router']);
app.config(function($locationProvider, $stateProvider, $urlRouterProvider){
    $stateProvider
        .state("index", {
            url: "/",
            templateUrl : "/views/home.html",
            controller : "indexController"
        })
        .state("login",{
            url : '/login',
            templateUrl:"views/login.html",
            controller : "loginController"
        })
        .state("login-flag", {
            url : '/login/:flag',
            templateUrl: "views/login.html",
            controller:"loginController"
        })
        .state("reset", {
            url:"/reset",
            templateUrl:"views/reset.html",
            controller:"resetController"
        })
        .state("logout",{
            url : '/logout',
            controller : "logoutController"
        })
        .state("register",{
            url : '/register',
            templateUrl:"views/register.html",
            controller : "signupUserController"
        })
        .state("designers", {
            url: "/designers/:keyword",
            templateUrl : "views/designers_listing.html",
            controller : "searchController"
        })
        .state("designer-profile", {
            url: "/designer-profile/:id",
            templateUrl : "views/designer_detail.html",
            controller : "designerProfileController"
        })
        .state("user-profile", {
            url: "/user-profile",
            templateUrl : "views/userProfile.html"
        })
        .state("user-profile-edit", {
            url: "/profile-edit",
            templateUrl : "views/editProfile.html",
            controller : "userProfileController"
        })
        .state("useful-links/", {
            url: "/useful-links/:param",
            templateUrl : "views/usefulLinks.html",
            controller : "usefulController"
        })
        .state("collection", {
            url:"/collection/:collectionId",
            templateUrl : "views/collections.html",
            controller : "collectionController"
        })
        .state("design", {
            url:"/design/:designId",
            templateUrl : "views/design.html",
            controller : "designController"
        })
        .state("events", {
            url:"/events",
            templateUrl:"views/events.html",
            controller:"eventsController"
        })
    ;
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);
});



app.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i=0; i<total; i++) {
            input.push(i);
        }

        return input;
    };
});


app.run(function($rootScope){

    $rootScope
        .$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                $("#ui-view").html("");
                $(".page-loading").removeClass("hidden");
            });

    $rootScope
        .$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){
                $(".page-loading").addClass("hidden");
            });

});



app.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;

            $scope.isolatedClick = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope.rating = $scope._rating = param;
                $scope.hoverValue = 0;
                $scope.click({
                    param: param
                });
            };

            $scope.isolatedMouseHover = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = 0;
                $scope.hoverValue = param;
                $scope.mouseHover({
                    param: param
                });
            };

            $scope.isolatedMouseLeave = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = $scope.rating;
                $scope.hoverValue = 0;
                $scope.mouseLeave({
                    param: param
                });
            };
        }
    };
});






app.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    };
} ]);

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
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

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1138328379582618',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
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

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?scope=email', function(response) {
        console.log(response);
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}



app.directive('fbShare', [
    function(designer) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    designer = JSON.parse(attrs.designer);

                    FB.ui({
                        method: 'feed',
                        name: designer.name,
                        picture : designer.image_url,
                        link: "www.faiseanrata.com/designer-profile/" + designer.id ,
                        caption: 'Faisean Rata | www.faiseanrata.com',
                        description: designer.desc,
                        message: "Checkout this designer's profile"
                    });

                    //console.log(attrs.designer);
                });
            }
        };
    }
]);

app.directive('fbShared', [
    function(design) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    design = JSON.parse(attrs.design);

                    FB.ui({
                        method: 'feed',
                        name: design.title,
                        picture : design.image_url,
                        // link: "www.faiseanrata.com/designer-profile/" + designer.id ,
                        caption: 'Checkout this design  Faisean Rata | www.faiseanrata.com',
                        description: "Check out this design "+ design.title,
                        message: "Checkout this design"
                    });

                    //console.log(attrs.designer);
                });
            }
        };
    }
]);


app.directive('lightslider', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (scope.$last) {

                // ng-repeat is completed
                element.parent().lightSlider({
                    item:4,
                    loop:false,
                    keyPress:false
                });
            }
        }
    };
});




app.config(function ($provide) {
    $provide.decorator('$uiViewScroll', function ($delegate) {
        return function (uiViewElement) {
            // var top = uiViewElement.getBoundingClientRect().top;
            window.scrollTo(0, (0));
            // Or some other custom behaviour...
        };
    });
});





app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});