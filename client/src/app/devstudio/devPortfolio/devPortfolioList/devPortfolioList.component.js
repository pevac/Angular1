(function(){
    angular.module("devPortfolioModule").component("devPortfolioList", {
        templateUrl: "app/devstudio/devPortfolio/devPortfolioList/devPortfolioList.tmpl.html",
        controller: "DevPortfolioController",
        controllerAs: "vm",
        bindings: {
            projects: "<",
        }
    });
})();