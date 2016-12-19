angular.module("orderCustomerModule")
    .controller("viewOrderCustomerCtrl", viewOrderCustomerCtrl);

viewOrderCustomerCtrl.$inject = ["$scope", "$stateParams", "serverDataService"]
function viewOrderCustomerCtrl($scope, $stateParams, serverDataService) {
    initForm();



    function initForm() {
        if(!$stateParams.orderId){ return; }
        getCustomerItem($stateParams.orderId);
    }

    function getCustomerItem(id){
        serverDataService.getCustomerItem(id).then(
            function(data){
                $scope.order = data;

            }
        )
    };
}