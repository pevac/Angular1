angular.module("orderCustomerModule",[])
.controller("orderCustomerCtrl", orderCustomerCtrl);

orderCustomerCtrl.$inject = ["$scope", "serverDataService"]
function orderCustomerCtrl($scope, serverDataService){
    var self = this;
    
      $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };

    self.getCustomers = function(){
       serverDataService.getCustomers().then(
           function(data){
               console.log(data);
               $scope.customers = data;
           }
       )
   };

   (function(){
       self.getCustomers();
   })();
}