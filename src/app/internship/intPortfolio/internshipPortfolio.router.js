(function(){
    "use strict";

    angular.module("intPortfolioModule").config(IntPortfolioRouterConfig);
    IntPortfolioRouterConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];

    function IntPortfolioRouterConfig($stateProvider, $urlRouterProvider, USER_ROLES){

        $stateProvider
            .state("home.intportfolio", {
                url: "/internship",
                template:'<div ui-view ></div>',
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
                       return  Resources.IntProjects.getAll();
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
                onEnter: saveProjectInSessionStorage,
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
                onEnter: saveProjectInSessionStorage,
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
                onEnter: saveProjectInSessionStorage,
                onExit: clearSessionStorage
            });

            clearSessionStorage.$inject = [ "$sessionStorage"];
            function clearSessionStorage($sessionStorage){
                delete    $sessionStorage.stateParams;
            }

            saveProjectInSessionStorage.$inject = [ "$stateParams", "$sessionStorage"];
            function saveProjectInSessionStorage($stateParams, $sessionStorage){
                if(!$sessionStorage.stateParams){
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.$default({stateParams: stateParams} );
                } 
                if($stateParams.data) {
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.stateParams = stateParams;
                } else {
                    $stateParams.data = $sessionStorage.$default().stateParams.data;
                }
            }
    }
})();