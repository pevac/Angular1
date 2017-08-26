(function(){
    "use strict";

    angular.module("orderCustomerModule").config(CustomerConfig);
    CustomerConfig.$inject = ["$stateProvider"];

    function CustomerConfig($stateProvider){

        $stateProvider
            .state("home.ordercustomer", {
                url: "/ordercustomer",
                template:"<div  ui-view ></div>",
                abstract: true
            })
            .state("home.ordercustomer.list", {
                url: "/list",
                component: "orderList",
                resolve: {
                    /* @ngInject */
                    customers:  function(Resources) {
                       return  Resources.Customers.query().$promise;
                    }
                }
            })
            .state("home.ordercustomer.view", {
                url: "/list",
                component: "orderViewer",
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
                            for(var key in $sessionStorage.$default().stateParams){
                                if($sessionStorage.$default().stateParams[key]) {
                                    $stateParams[key] = $sessionStorage.$default().stateParams[key];
                                }
                            }
                        }
                }],
                onExit: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                        delete    $sessionStorage.stateParams;
                }]
            });
    }
})();