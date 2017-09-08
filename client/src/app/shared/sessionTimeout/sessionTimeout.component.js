(function(){
  angular.module("appModule")
  .component("sessionTimeout", sessionTimeout())
  .controller("sessionTimeoutController", sessionTimeoutController);


  function sessionTimeout(){
    return {
      templateUrl: "app/shared/sessionTimeout/sessionTimeout.tmpl.html",
      controller: "sessionTimeoutController"
    }
  }

  sessionTimeoutController.$inject = ["$rootScope", "AUTH_EVENTS"]
  function sessionTimeoutController($rootScope, AUTH_EVENTS) {
        var vm = this;
    
        vm.$onInit = function () {
          vm.message = "session timeout";
        };

        vm.ok = function(){
              $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        }
  }
})();




