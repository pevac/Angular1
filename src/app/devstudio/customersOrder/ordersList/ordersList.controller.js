(function () {
    angular.module("orderCustomerModule",[])
        .controller("orderCustomerCtrl", orderCustomerCtrl);

    orderCustomerCtrl.$inject = ["$scope", "serverDataService", "FileSaver", "Blob", "$templateCache", "$compile", "$timeout", "serverActService"];
    function orderCustomerCtrl($scope, serverDataService, FileSaver, Blob, $templateCache, $compile, $timeout, serverActService){
        var vm = this;
        vm.itemsByPage = 10;

        vm.deleteCustomerOrder = function(order){
            var checkDelete = confirm("Видалити замовлення");
            if(!checkDelete) return;
            serverActService.deleteCustomerOrder(order).then(function (response) {
                getCustomers();
            });
        };

        vm.exportData = function () {
            if(!document.getElementById('fullOrderCustomersTable')) {
                var el = document.createElement("div");
                el.innerHTML = $templateCache.get("devstudio/customersOrder/orderTable/fullOrderCustomersTable.tmpl.html");
                el.style = "display: none";
                var compiled = $compile(el);
                compiled(vm);
                document.body.append(el);
            }

            $timeout(function () {
                var blob = new Blob([document.getElementById('fullOrderCustomersTable').innerHTML], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"
                });
                FileSaver.saveAs(blob, "Report.xls");
            }, 100);
        };

        vm.saveData = function (data){
            serverDataService.getCustomerItem(data.id).then(
                function(data){
                    $scope.order = vm.order = data;
                    if(!document.getElementById('exportOrder')) {
                        var el = document.createElement("div");
                        el.innerHTML = $templateCache.get("devstudio/customersOrder/orderTable/orderCustomerTable.tmpl.html");
                        el.style = "display: none";
                        // var compiled = $compile(el);
                        // compiled($scope);
                        document.getElementById('exportTable').append(el);
                    }
                    $timeout(function () {
                        var  blob = new Blob([document.getElementById('exportOrder').innerHTML], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"});
                        FileSaver.saveAs(blob, "Report.xlsx");
                    }, 100);

                }
            )
        };

        function getCustomers(){
            serverDataService.getCustomers().then(
                function(data){
                    $scope.customers = vm.customers = [];
                    $scope.customers = vm.customers = data;
                    $scope.customerCollection = vm.customerCollection = [].concat(vm.customers);
                }
            )
        };

        getCustomers();
    }
})();

