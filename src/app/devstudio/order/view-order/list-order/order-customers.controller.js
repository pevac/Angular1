(function () {
    angular.module("orderCustomerModule",[])
        .controller("orderCustomerCtrl", orderCustomerCtrl)

    orderCustomerCtrl.$inject = ["$scope", "serverDataService", "FileSaver", "Blob", "$templateCache", "$compile", "$timeout"];
    function orderCustomerCtrl($scope, serverDataService, FileSaver, Blob, $templateCache, $compile, $timeout){
        var self = this;
        $scope.itemsByPage = 10;

        $scope.exportData = function () {
            var blob = new Blob([document.getElementById('exportable').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"
            });
            FileSaver.saveAs(blob, "Report.xls");
        };

        $scope.saveData = function (data){
            serverDataService.getCustomerItem(data.id).then(
                function(data){
                    $scope.order = data;
                    if(!document.getElementById('exportOrder')) {
                        console.log($scope.order);
                        var el = document.createElement("div");
                        el.innerHTML = $templateCache.get("shared/order-form/order.tmpl.html");
                        el.style = "display: none";
                        var compiled = $compile(el);
                        compiled($scope);
                        document.body.append(el);
                    }
                    $timeout(function () {
                        var  blob = new Blob([document.getElementById('exportOrder').innerHTML], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"});
                        FileSaver.saveAs(blob, "Report.xls");
                    }, 0);

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

