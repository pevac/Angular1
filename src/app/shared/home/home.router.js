(function(){
    "use strict";
    angular.module("homeModule").config(HomeRouterConfig);
    HomeRouterConfig.$inject = ["$stateProvider", "USER_ROLES"];
    
    // Using @ngInject annotations
    function HomeRouterConfig($stateProvider,  USER_ROLES) {
        $stateProvider
            .state("home", {
                url: "/app",
                component: "home",
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
            })
            .state("home.timeout", {
                url: "/timeout",
                modal: true,
                component: "sessionTimeout",
                resolve: {
                     /* @ngInject */
                     idle: function resolveIdle(IdleResolver) {
                        return IdleResolver.resolve();
                    }
                }
            })
            .state("home.accessdenied", {
                url: '/accessdenied',
                modal: true,
                component: "accessDenied"
            });

    }
})();



