(function(){
    angular.module("intPortfolioModule").component("reviewList", {
        templateUrl: "app/internship/reviews/listreview/reviews.html",
        controller: "ReviewListController",
        controllerAs: "vm",
        bindings: {
            reviews: "<"
        }
    });
})();