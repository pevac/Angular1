(function(){
    angular.module("intPortfolioModule").component("intPortfolioList", {
        templateUrl: "app/internship/intPortfolio/intPortfolioList/intPortfolioList.tmpl.html",
        controller: "IntPortfolioListController",
        controllerAs: "vm",
        bindings: {
            projects: "<"
        }
    });
})();