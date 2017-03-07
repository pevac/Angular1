(function(){
    "use strict";
    angular.module("appModule")
        .config(RouterConfig)
        // .run(StateParams);

    RouterConfig.$inject = ["$urlRouterProvider"];
    // Using @ngInject annotations
    function RouterConfig( $urlRouterProvider) {

        $urlRouterProvider.otherwise("/app");
        $urlRouterProvider.when("", "/login");
        
        /* @ngInject */
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path();
            var normalized = path.toLowerCase();

            if (path != normalized) {
                $location.replace().path(normalized);
            }
        });
            
    }

    StateParams.$inject = ["$stateParams", "$sessionStorage", "$rootScope"];
    function StateParams($stateParams, $sessionStorage, $rootScope){
        $rootScope.$on("$stateChangeStart", function (event, next) {
         
        });
    }
})();

