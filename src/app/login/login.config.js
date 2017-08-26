(function(){
    "use strict";
    angular.module("loginModule")
        .run(InitLogin)
        .config(RequestProvider)
        .constant("AUTH_EVENTS", {
            loginSuccess: "auth-login-success",
            loginFailed: "auth-login-failed",
            logoutSuccess: "auth-logout-success",
            sessionTimeout: "auth-session-timeout",
            notAuthenticated: "auth-not-authenticated",
            notAuthorized: "auth-not-authorized"
        })
        .constant("USER_ROLES", {
            all: "*",
            admin: "admin",
            expert: "expert"
        });
    
    InitLogin.$inject = ["$rootScope", "AUTH_EVENTS","$location", "AuthService", "$transitions"];
    function InitLogin($rootScope, AUTH_EVENTS,  $location, AuthService, $transitions) {
        // enumerate routes that don't need authentication
        var routesThatDontRequireAuth = ["/login"];
        var routesApp = "/app";
        var nextRoute = "/app";

        // check if current location matches route  
        var routeClean = function (route) {
            if (!angular.isArray(routesThatDontRequireAuth)) {
                routesThatDontRequireAuth = [routesThatDontRequireAuth];
            }
            return ( routesThatDontRequireAuth.indexOf(route) !== -1);
        };

         var routeContainAppRoute = function (route) {
            return ( route.indexOf(routesApp) !== -1);
        };

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(){
            $location.path("/login");
        });

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function(){
            $location.path("/login");
        });

        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function(){
            AuthService.logout();
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
            AuthService.logout();
            $location.path("/login");
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, next){
            if(routeClean($location.url())) {
                $location.path("/app");
            }
        });

        $transitions.onStart({}, function(trans) {
            var AuthenticationService = trans.injector().get("AuthService");
            var authorizedRoles =trans.$to().data.authorizedRoles;

            if (!routeClean($location.url()) && !AuthenticationService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthenticationService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }else if(routeContainAppRoute($location.url()) && AuthenticationService.isAuthorized(authorizedRoles)){
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }
            
        });

    }

    RequestProvider.$inject = ["$httpProvider"];
    function RequestProvider($httpProvider)  {
        $httpProvider.interceptors.push([
            "$injector",
            function ($injector) {
                return $injector.get("AuthInterceptor");
            }
        ]);
    }

})();