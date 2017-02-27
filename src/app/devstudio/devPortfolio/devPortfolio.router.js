(function(){
    "use strict";

    angular.module("devPortfolioModule").config(DevPortfolioRouterConfig);
    DevPortfolioRouterConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];

    function DevPortfolioRouterConfig($stateProvider, $urlRouterProvider, USER_ROLES){

        $stateProvider
            .state("home.devportfolio", {
                url: "/devportfolio",
                template:'<div  ui-view ></div>',
                abstract: true
            })
            .state("home.devportfolio.list", {
                url: "/list",
                templateUrl:"devstudio/devPortfolio/devPortfolioList/devPortfolioList.tmpl.html",
                controller: "DevPortfolioController",
                controllerAs: 'vm',
                resolve: {
                    /* @ngInject */
                    projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    }
                }
            })
            .state("home.devportfolio.addportfolio", {
                url: "/add",
                controller: "AddDevPortfolioController",
                controllerAs: 'vm',
                templateUrl:"devstudio/devPortfolio/devPortfolioForm/devPortfolioForm.tmpl.html",
            })
            .state("home.devportfolio.editportfolio", {
                url: "/edit",
                templateUrl:"devstudio/devPortfolio/devPortfolioForm/devPortfolioForm.tmpl.html",
                controller: "AddDevPortfolioController",
                controllerAs: 'vm',
                params : {
                    data: null,
                    // previousState: null
                },
                onEnter: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                        if(!$sessionStorage.stateParams){
                            $sessionStorage.$default({stateParams: { data: $stateParams.data}} );
                        } 
                        if($stateParams.data) {
                            $sessionStorage.stateParams = { data: $stateParams.data};
                        } else {
                            $stateParams.data = $sessionStorage.$default().stateParams.data;
                        }
                }],
                onExit: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                        delete    $sessionStorage.stateParams;
                }]
            })
            .state("home.devportfolio.viewportfolio", {
                url: "/view",
                templateUrl:"devstudio/devPortfolio/devPortfolioView/devPortfolioView.tmpl.html",
                controller: "ViewDevPortfolioController",
                controllerAs: 'vm',
                params : {
                    previousState: null,
                    data: null
                },
                onEnter: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                        if($sessionStorage.stateParams){
                            $sessionStorage.$default({stateParams: {previousState: $stateParams.previousState, data: $stateParams.data}} );
                        } 
                        if($stateParams.previousState&&$stateParams.data) {
                            $sessionStorage.stateParams = {previousState: $stateParams.previousState, data: $stateParams.data};
                        } else {
                            $stateParams.previousState = $sessionStorage.$default().stateParams.previousState;
                            $stateParams.data = $sessionStorage.$default().stateParams.data;
                        }
                        
                }],
                onExit: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                        delete    $sessionStorage.stateParams;
                }]
            });
    }
})();