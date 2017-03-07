(function(){
      angular.module("sidebarModule").component("sidebar", {
          templateUrl: "shared/sidebar/sidebar.html",
          controller: "SidebarController",
          controllerAs: "vm"
      });
})();