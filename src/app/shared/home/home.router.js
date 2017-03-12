(function(){
    "use strict";
    angular.module("homeModule").config(HomeRouterConfig);
    HomeRouterConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];
    
    // Using @ngInject annotations
    function HomeRouterConfig($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
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
                    Resources: "Resources",
                    /* @ngInject */
                    auth: function resolveAuthentication(AuthResolver) {
                        return AuthResolver.resolve();
                    }
                }
            });

    }
})();



