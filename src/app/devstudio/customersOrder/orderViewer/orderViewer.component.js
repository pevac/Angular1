(function(){
    angular.module("devPortfolioModule").component("orderViewer", {
        templateUrl: "app/devstudio/customersOrder/orderViewer/orderViewer.tpml.html",
        controller: "ViewCustomerController",
        controllerAs: "vm",
        bindings: {
            order: "<"
        }
    });
})();