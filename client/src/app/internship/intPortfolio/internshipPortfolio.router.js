(function(){
    "use strict";

    angular.module("intPortfolioModule").config(IntPortfolioRouterConfig);
    IntPortfolioRouterConfig.$inject = ["$stateProvider"];

    function IntPortfolioRouterConfig($stateProvider){

        $stateProvider
            .state("home.intportfolio", {
                url: "/internship",
                template:"<div ui-view ></div>",
                abstract: true
            })
            .state("home.intportfolio.list", {
                url: "/list",
                component: "intPortfolioList",
                resolve: {
                     /* @ngInject */
                    projects:  function(Resources) {
                       return  Resources.IntProjects.query().$promise;
                    }
                }
            })
            .state("home.intportfolio.addportfolio", {
                url: "/add",
                component: "intPortfolioForm",
                params: {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.intportfolio.editportfolio", {
                url: "/edit",
                component: "intPortfolioForm",
                params: {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.intportfolio.viewportfolio", {
                url: "/view",
                component: "intPortfolioViewer",
                params: {
                    data: null,
                    previousState: null
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
                } else {
                    for(var key in $sessionStorage.$default().stateParams){
                        if($sessionStorage.$default().stateParams[key]) {
                            $stateParams[key] = $sessionStorage.$default().stateParams[key];
                        }
                    }
                }
            }
    }
})();