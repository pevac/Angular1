(function(){
    "use strict";

    angular.module("devPortfolioModule").config(DevPortfolioRouterConfig);
    DevPortfolioRouterConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];

    function DevPortfolioRouterConfig($stateProvider, $urlRouterProvider, USER_ROLES){

        $stateProvider
            .state("home.devportfolio", {
                url: "/devportfolio",
                template:"<div  ui-view ></div>",
                abstract: true
            })
            .state("home.devportfolio.list", {
                url: "/list",
                templateUrl:"devstudio/devPortfolio/devPortfolioList/devPortfolioList.tmpl.html",
                controller: "DevPortfolioController",
                controllerAs: 'vm',
                resolve: {
                    /* @ngInject */
                    projects:  function(Resources) {
                        return Resources.DevProjects.query().$promise;
                    }
                }
            })
            .state("home.devportfolio.addportfolio", {
                url: "/add",
                controller: "AddDevPortfolioController",
                controllerAs: 'vm',
                templateUrl:"devstudio/devPortfolio/devPortfolioForm/devPortfolioForm.tmpl.html",
                params: {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.devportfolio.editportfolio", {
                url: "/edit",
                templateUrl:"devstudio/devPortfolio/devPortfolioForm/devPortfolioForm.tmpl.html",
                controller: "AddDevPortfolioController",
                controllerAs: 'vm',
                params : {
                    data: null
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
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
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            });

            clearSessionStorage.$inject = [ "$sessionStorage"];
            function clearSessionStorage($sessionStorage){
                delete    $sessionStorage.stateParams;
            }

            saveSessionStorage.$inject = [ "$stateParams", "$sessionStorage"];
            function saveSessionStorage($stateParams, $sessionStorage){
                if(!$sessionStorage.stateParams){
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.$default({stateParams: stateParams} );
                } 
                if($stateParams.data) {
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.stateParams = stateParams;
                } else {
                    for(var key in $sessionStorage.$default().stateParams){
                        $stateParams[key] = $sessionStorage.$default().stateParams[key];
                    }
                    
                }
            }   
    }
})();