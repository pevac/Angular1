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
                templateUrl:"internship/intPortfolio/intPortfolioList/intPortfolioList.tmpl.html",
                controller: 'IntPortfolioListController',
                controllerAs: "vm",
                 resolve: {
                     /* @ngInject */
                    projects:  function(Resources) {
                       return  Resources.IntProjects.query().$promise;
                    }
                }
            })
            .state("home.intportfolio.addportfolio", {
                url: "/add",
                templateUrl:"internship/intPortfolio/intPortfolioForm/intPortfolioForm.tmpl.html",
                controller: "AddIntPortfolioController",
                controllerAs: "vm",
                params: {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.intportfolio.editportfolio", {
                url: "/edit",
                templateUrl:"internship/intPortfolio/intPortfolioForm/intPortfolioForm.tmpl.html",
                controller: "AddIntPortfolioController",
                controllerAs: "vm",
                params: {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.intportfolio.viewportfolio", {
                url: "/view",
                templateUrl:"internship/intPortfolio/intPortfolioView/intPortfolioView.tmpl.html",
                controller: "IntPortfolioViewController",
                controllerAs: "vm",
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
                        $stateParams[key] = $sessionStorage.$default().stateParams[key];
                    }
                }
            }
    }
})();