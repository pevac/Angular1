(function(){
    "use strict";
    angular.module("appModule").config(RouterConfig);
    RouterConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];
    
    // Using @ngInject annotations
    function RouterConfig($stateProvider, $urlRouterProvider, USER_ROLES) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "login/login.tmpl.html",
                controller: "LoginController",
                controllerAs: "vm",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.expert]
                }
            })
            .state("home", {
                url: "/app",
                templateUrl: "shared/home/home.html",
                controller: "HomeController",
                controllerAs: "vm",
                abstract: false,
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.expert]
                },
                resolve: {
                    /* @ngInject */
                    auth: function resolveAuthentication(AuthResolver) {
                        return AuthResolver.resolve();
                    }
                }
            })
            
    };
})();



