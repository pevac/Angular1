(function(){
    angular.module("devPortfolioModule").component("orderList", {
        templateUrl: "app/devstudio/customersOrder/ordersList/ordersList.tmpl.html",
        controller: "OrderCustomerController",
        controllerAs: "vm",
        bindings: {
            customers: "<"
        }
    });
})();