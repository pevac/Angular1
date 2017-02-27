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
                    projects:  function(serverDataService) {
                       return  serverDataService.getIntProjects();
                    }
                }
            })
            .state("home.intportfolio.addportfolio", {
                url: "/add",
                templateUrl:"internship/intPortfolio/intPortfolioForm/intPortfolioForm.tmpl.html",
                controller: "AddIntPortfolioController",
                controllerAs: "vm",
            })
            .state("home.intportfolio.editportfolio", {
                url: "/edit",
                templateUrl:"internship/intPortfolio/intPortfolioForm/intPortfolioForm.tmpl.html",
                controller: "AddIntPortfolioController",
                controllerAs: "vm",
                params: {
                    data: null
                },
                  onEnter: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                        if($stateParams.data) {
                            $sessionStorage.$default({stateParams: {data: $stateParams.data}} );
                        } else {
                            $stateParams.data = $sessionStorage.$default().stateParams.data;
                        }
                }],
                onExit: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                        delete    $sessionStorage.$default().stateParams;
                }]
            })
    }
})();