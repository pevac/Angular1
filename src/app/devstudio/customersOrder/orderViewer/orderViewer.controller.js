(function () {
    angular.module("orderCustomerModule")
        .controller("ViewCustomerController", ViewCustomerController);

    ViewCustomerController.$inject = ["$scope",  "serverDataService", "FileSaver", "Blob", "order"]
    function ViewCustomerController($scope,   serverDataService, FileSaver, Blob, order) {
        var vm = this;
        vm.order = order;
        
        vm.exportData = function () {
            var blob = new Blob([document.getElementById('exportOrder').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"
            });
            FileSaver.saveAs(blob, "customer.xls");
        };

    }
})();

