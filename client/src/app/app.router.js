(function(){
    "use strict";
    angular.module("appModule")
        .config(RouterConfig);

    RouterConfig.$inject = ["$urlRouterProvider", "$stateProvider", "USER_ROLES"];
    // Using @ngInject annotations
    function RouterConfig( $urlRouterProvider, $stateProvider, USER_ROLES) {

        $urlRouterProvider.otherwise("/app");
        $urlRouterProvider.when("", "/app");
        
        /* @ngInject */
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path();
            var normalized = path.toLowerCase();

            if (path != normalized) {
                $location.replace().path(normalized);
            }
        });

        $stateProvider
        .state("timeout", {
            url: "/timeout",
            modal: true,
            component: "sessionTimeout",
            data: {
                authorizedRoles: [USER_ROLES.all]
            },
            resolve: {
                 /* @ngInject */
                 idle: function resolveIdle(IdleResolver) {
                    return IdleResolver.resolve();
                }
            }
        }) 
        .state("accessdenied", {
            url: '/accessdenied',
            modal: true,
            component: "accessDenied",
            data: {
                authorizedRoles: [USER_ROLES.all]
            },
        });

    }


  


})();

