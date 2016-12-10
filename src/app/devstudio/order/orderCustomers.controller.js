angular.module("orderCustomerModule",[])
.controller("orderCustomerCtrl", orderCustomer);

function orderCustomer($scope, serverDataService){
   
   $scope.getCustomers = function(){
       serverDataService.getCustomers().then(
           function(data){
               console.log(data);
               $scope.customers = data;
           }
       )
   };

   (function(){
       console.log("customer");
       $scope.getCustomers();
   })();
}