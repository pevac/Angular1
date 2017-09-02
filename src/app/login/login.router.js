(function(){
    "use strict";
    angular.module("loginModule").config(LoginRouterConfig);
    LoginRouterConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];
    
    // Using @ngInject annotations
    function LoginRouterConfig($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
            .state("login", {
                url: "/login",
                component: "login",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.expert]
                }
            });
            
    }
})();
