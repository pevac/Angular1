(function(){
    "use strict";

    angular.module("orderCustomerModule").config(CustomerConfig);
    CustomerConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];

    function CustomerConfig($stateProvider, $urlRouterProvider, USER_ROLES){

        $stateProvider
            .state("home.ordercustomer", {
                url: "/ordercustomer",
                template:"<div  ui-view ></div>",
                abstract: true
            })
            .state("home.ordercustomer.list", {
                url: "/list",
                templateUrl:"devstudio/customersOrder/ordersList/ordersList.tmpl.html",
                controller: "OrderCustomerController",
                controllerAs: "vm",
                resolve: {
                    /* @ngInject */
                    customers:  function(Resources) {
                       return  Resources.Customers.query().$promise;
                    }
                }
            })
            .state("home.ordercustomer.view", {
                url: "/view",
                templateUrl:"devstudio/customersOrder/orderViewer/orderViewer.tpml.html",
                controller: "ViewCustomerController",
                controllerAs: "vm",
                params: {
                    data: null
                },
                resolve: {
                    /* @ngInject */
                    order:  function(Resources, $sessionStorage, $stateParams) {
                        var id = $stateParams.data ? $stateParams.data.orderId : $sessionStorage.$default().stateParams.data.orderId;
                        return  Resources.Customers.get({id: id}).$promise;
                    }
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
            });
    }
})();