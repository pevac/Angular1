(function(){
    angular.module("appModule")
    .component("accessDenied", accessDenied())
    .controller("accessDeniedController",accessDeniedController);
  
  
    function accessDenied(){
      return {
        templateUrl: "app/shared/error/accessdenied.tmpl.html"
      }
    }

    accessDeniedController.$inject = ["$rootScope", "AUTH_EVENTS"]
    function accessDeniedController($rootScope, AUTH_EVENTS) {
          var vm = this;
      
          vm.$onInit = function () {
            vm.message = "access denied";
          };
  
          // vm.ok = function(){
          //       $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
          // }
    }
  
  })();
  