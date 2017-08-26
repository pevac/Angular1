angular.module("appModule").component("modal", {
    templateUrl: "app/shared/modal/modal.tmpl.html",
    controller: function () {
      var vm = this;
  
      vm.$onInit = function () {
        vm.message = "session timeout";
      };

      // vm.ok = function(){
      //       $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      // }
  
    }
});

