(function(){
    "use strict";
    angular.module("loginModule")
        .run(InitLogin);
    
    InitLogin.$inject = ["$rootScope", "AUTH_EVENTS", "$state", "AuthService", "$transitions"];
    function InitLogin($rootScope, AUTH_EVENTS,  $state, AuthService, $transitions) {
        // enumerate routes that don't need authentication
        var routesThatDontRequireAuth = ["/login", "/accessdenied"];
        // check if current location matches route  
        var routeClean = function (route) {
            if (!angular.isArray(routesThatDontRequireAuth)) {
                routesThatDontRequireAuth = [routesThatDontRequireAuth];
            }
            return ( routesThatDontRequireAuth.indexOf(route) !== -1);
        };

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(){
            AuthService.logout();
            $state.go("login")
        });

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function(){
            $state.go("accessdenied");
        });

        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function(){
            $state.go("home.timeout");
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
            AuthService.logout();
            $state.go("login")
        });

        // $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
        //     $state.go("home")
        // });

        $transitions.onStart({}, function(trans) {
            var AuthenticationService = trans.injector().get("AuthService");
            var authorizedRoles =trans.$to().data.authorizedRoles;

            if (!routeClean(trans.$to().self.url) && !AuthenticationService.isAuthorized(authorizedRoles)) {
                if (AuthenticationService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            } 
        });

    }

})();
