(function(){
    "use strict";

    angular.module("devPortfolioModule").config(DevPortfolioRouterConfig);
    DevPortfolioRouterConfig.$inject = ["$stateProvider"];

    function DevPortfolioRouterConfig($stateProvider){

        $stateProvider
            .state("home.devportfolio", {
                url: "/devportfolio",
                template:"<div  ui-view ></div>",
                abstract: true
            })
            .state("home.devportfolio.list", {
                url: "/list",
                component: "devPortfolioList",
                resolve: {
                    /* @ngInject */
                    projects:  function(Resources) {
                        return Resources.DevProjects.query().$promise;
                    }
                }
            })
            .state("home.devportfolio.addportfolio", {
                url: "/add",
                component: "devPortfolioForm",
                params: {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.devportfolio.editportfolio", {
                url: "/edit",
                component: "devPortfolioForm",
                params : {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.devportfolio.viewportfolio", {
                url: "/view",
                component: "viewDevPortfolio",
                params : {
                    previousState: null,
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            });

            clearSessionStorage.$inject = [ "$sessionStorage"];
            function clearSessionStorage($sessionStorage){
                delete    $sessionStorage.stateParams;
            }

            saveSessionStorage.$inject = [ "$stateParams", "$sessionStorage"];
            function saveSessionStorage($stateParams, $sessionStorage){
                var stateParams;
                if(!$sessionStorage.stateParams){
                    stateParams = angular.copy($stateParams);
                    $sessionStorage.$default({stateParams: stateParams} );
                } 
                if($stateParams.data) {
                    stateParams = angular.copy($stateParams);
                    $sessionStorage.stateParams = stateParams;
                } 
                else {
                    for(var key in $sessionStorage.$default().stateParams){
                        if($sessionStorage.$default().stateParams[key]) {
                            $stateParams[key] = {};
                            $stateParams[key] = $sessionStorage.$default().stateParams[key];
                        }
                    }
                    
                }
            }   
    }
})();