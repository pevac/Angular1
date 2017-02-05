(function () {
    angular.module("orderCustomerModule")
        .controller("viewOrderCustomerCtrl", viewOrderCustomerCtrl);

    viewOrderCustomerCtrl.$inject = ["$scope", "$stateParams", "serverDataService", "FileSaver", "Blob"]
    function viewOrderCustomerCtrl($scope, $stateParams, serverDataService, FileSaver, Blob) {

        $scope.exportData = function () {
            var blob = new Blob([document.getElementById('exportOrder').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"
            });
            FileSaver.saveAs(blob, "Report.xlsx");
        };

        initForm();

        function initForm() {
            if(!$stateParams.orderId){ return; }
            getCustomerItem($stateParams.orderId);
        }

        function getCustomerItem(id){
            serverDataService.getCustomerItem(id).then(
                function(data){
                    console.log(data);
                    $scope.order = data;
                }
            )
        };
    }
})();

