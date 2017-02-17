(function () {
    angular.module("orderCustomerModule",[])
        .controller("orderCustomerCtrl", orderCustomerCtrl)

    orderCustomerCtrl.$inject = ["$scope", "serverDataService", "FileSaver", "Blob", "$templateCache", "$compile", "$timeout", "serverActService"];
    function orderCustomerCtrl($scope, serverDataService, FileSaver, Blob, $templateCache, $compile, $timeout, serverActService){
        var self = this;
        $scope.itemsByPage = 10;

        $scope.deleteCustomerOrder = function(order){
            serverActService.deleteCustomerOrder(order).then(function (response) {
                  alert("ahueno");
            });
        };

        $scope.exportData = function () {
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
                FileSaver.saveAs(blob, "Report.xlsx");
            }, 100);
        };

        $scope.saveData = function (data){
            serverDataService.getCustomerItem(data.id).then(
                function(data){
                    $scope.order = data;
                    if(!document.getElementById('exportOrder')) {
                        console.log($scope.order);
                        var el = document.createElement("div");
                        el.innerHTML = $templateCache.get("devstudio/customersOrder/orderTable/orderCustomerTable.tmpl.html");
                        el.style = "display: none";
                        var compiled = $compile(el);
                        compiled($scope);
                        document.body.append(el);
                    }
                    $timeout(function () {
                        var  blob = new Blob([document.getElementById('exportOrder').innerHTML], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"});
                        FileSaver.saveAs(blob, "Report.xlsx");
                    }, 100);

                }
            )
        };

        self.getCustomers = function(){
            serverDataService.getCustomers().then(
                function(data){
                    $scope.customers = [];
                    $scope.customers = data;
                    $scope.customerCollection = [].concat($scope.customers);
                }
            )
        };

        (function(){
            self.getCustomers();
        })();
    }
})();

