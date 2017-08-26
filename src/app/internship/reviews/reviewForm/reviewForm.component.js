(function(){
    angular.module("intPortfolioModule").component("reviewForm", {
        templateUrl: "app/internship/reviews/reviewForm/reviewForm.tmpl.html",
        controller: "ReviewFormController",
        controllerAs: "vm",
        bindings: {
            jobPositions: "<"
        }
    });
})();