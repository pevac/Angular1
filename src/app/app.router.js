(function(){
    "use strict";
    angular.module("appModule")
        .config(RouterConfig);

    RouterConfig.$inject = ["$urlRouterProvider", "$stateProvider"];
    // Using @ngInject annotations
    function RouterConfig( $urlRouterProvider, $stateProvider) {

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

    }


  


})();

