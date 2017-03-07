(function () {
    "use strict";

    angular.module("orderCustomerModule").controller("OrderCustomerController", OrderCustomerController);
    OrderCustomerController.$inject = ["$scope", "$state",  "FileSaver", "Blob", "$templateCache", "$compile", "$timeout",  "customers", "Resources"];
    
    function OrderCustomerController($scope, $state,  FileSaver, Blob, $templateCache, $compile, $timeout,  customers, Resources){
        var vm = this;
        vm.itemsByPage = 10;

        vm.customers = customers;
        vm.customerCollection = [].concat(vm.customers);

        vm.deleteCustomerOrder = function(order, index){
            var checkDelete = confirm("Видалити замовлення");
            if(!checkDelete) return;
            order.$remove(function () {
                vm.vacancies.splice(index, 1);
                $state.reload();
            });
        };

        vm.goToEdit = function(id, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {orderId: id} }, {} );
        };

        vm.exportData = function () {
            if(!document.getElementById('fullOrderCustomersTable')) {
                var el = document.createElement("div");
                el.innerHTML = $templateCache.get("devstudio/customersOrder/orderTable/fullOrderCustomersTable.tmpl.html");
                el.style = "display: none";
                var compiled = $compile(el);
                compiled($scope);
                document.body.append(el);
            }

            $timeout(function () {
                var blob = new Blob([document.getElementById('fullOrderCustomersTable').innerHTML], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"
                });
                FileSaver.saveAs(blob, "Report.xls");
            }, 100);
        };

        vm.saveData = function (customer){
           customer.$get(
              function(data){
                    $scope.order = vm.order = data;
                    if(!document.getElementById('exportOrder')) {
                        var el = document.createElement("div");
                        el.innerHTML = $templateCache.get("devstudio/customersOrder/orderTable/orderCustomerTable.tmpl.html");
                        el.style = "display: none";
                        var compiled = $compile(el);
                        compiled($scope);
                        document.getElementById('exportTable').append(el);
                    }
                    $timeout(function () {
                        var  blob = new Blob([document.getElementById('exportOrder').innerHTML], 
                        {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"});
                        FileSaver.saveAs(blob, "Report.xls");
                    }, 100);

                }
            );
        };
    }
})();

