(function () {
    "use strict";

    angular.module("orderCustomerModule").controller("ViewCustomerController", ViewCustomerController);
    ViewCustomerController.$inject = ["FileSaver", "Blob"];

    function ViewCustomerController(FileSaver, Blob) {
        var vm = this;
        
        vm.exportData = function () {
            var blob = new Blob([document.getElementById("exportOrder").innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"
            });
            
            FileSaver.saveAs(blob, "customer.xls");
        };
    }
})();

