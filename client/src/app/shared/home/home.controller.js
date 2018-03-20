(function(){
    "use strict";

    angular.module("homeModule").controller("HomeController",  HomeController);
  
    HomeController.$inject = ["$rootScope", "AUTH_EVENTS", "$uibModal", "$log"];
    function HomeController ( $rootScope, AUTH_EVENTS,   $uibModal, $log) {
        var vm = this;
        // vm.animationsEnabled = true;

        // var logout = function(){
        //     $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        // }

        // vm.openComponentModal = function () {
        //     var modalInstance = $uibModal.open({
        //         animation: vm.animationsEnabled,
        //         component: "modalComponent",
        //         resolve: {
        //             message: function () {
        //                 return "session timeout";
        //             },
        //             logout: function(){ return logout; }
        //         }
        //     });
      
        //   modalInstance.result.then(function () {
        //         $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        //   }, function () {
        //     $log.info("modal-component dismissed at: " + new Date());
        //   });
          
        // };

        // $rootScope.$on(AUTH_EVENTS.sessionTimeout, function(){
        //     vm.openComponentModal();
        // });
    }
})();
