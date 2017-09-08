(function(){
    "use strict";
    
    angular.module("intPortfolioModule").component("review", {
        templateUrl: "app/internship/reviews/review/review.tmpl.html",
        controller: "ReviewController",
        controllerAs: "vm"
    });
})();