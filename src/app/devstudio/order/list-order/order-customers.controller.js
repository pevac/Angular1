angular.module("orderCustomerModule",[])
.controller("orderCustomerCtrl", orderCustomerCtrl);

orderCustomerCtrl.$inject = ["$scope", "serverDataService"]
function orderCustomerCtrl($scope, serverDataService){
    var self = this;


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