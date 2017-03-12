(function(){
      angular.module("sidebarModule").component("sidebar", {
          templateUrl: "shared/sidebar/sidebar.tmpl.html",
          controller: "SidebarController",
          controllerAs: "vm"
      });
})();