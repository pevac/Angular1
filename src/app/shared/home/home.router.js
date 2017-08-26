(function(){
    "use strict";
    angular.module("homeModule").config(HomeRouterConfig);
    HomeRouterConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];
    
    // Using @ngInject annotations
    function HomeRouterConfig($stateProvider, $urlRouterProvider, USER_ROLES) {
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
            .state("home.modal", {
                url: '/modal',
                modal: true,
                component: "modal"
            });

    }
})();



