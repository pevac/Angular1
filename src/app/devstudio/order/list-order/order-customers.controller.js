(function () {
    angular.module("orderCustomerModule",[])
        .controller("orderCustomerCtrl", orderCustomerCtrl);

    orderCustomerCtrl.$inject = ["$scope", "serverDataService", "FileSaver", "Blob"]
    function orderCustomerCtrl($scope, serverDataService, FileSaver, Blob){
        var self = this;

        $scope.exportData = function () {
            var blob = new Blob([document.getElementById('exportable').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"
            });
            FileSaver.saveAs(blob, "Report.xls");
        };
        $scope.customers = [{company: "EPAM", mail: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
            {company: "EPAM", mail: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
            {company: "EPAM", mail: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },]
        self.getCustomers = function(){
            serverDataService.getCustomers().then(
                function(data){
                    $scope.customers = data;
                }
            )
        };

        (function(){
            self.getCustomers();
        })();
    }
})();

