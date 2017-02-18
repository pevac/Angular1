(function () {
    angular.module("orderCustomerModule")
        .controller("viewOrderCustomerCtrl", viewOrderCustomerCtrl);

    viewOrderCustomerCtrl.$inject = ["$scope", "$stateParams", "serverDataService", "FileSaver", "Blob"]
    function viewOrderCustomerCtrl($scope, $stateParams, serverDataService, FileSaver, Blob) {
        var vm = this;
        vm.exportData = function () {
            var blob = new Blob([document.getElementById('exportOrder').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"
            });
            FileSaver.saveAs(blob, "Report.xls");
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
                    vm.order = data;
                }
            )
        };
    }
})();

