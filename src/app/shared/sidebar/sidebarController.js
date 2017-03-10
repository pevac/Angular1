(function(){
    angular.module("sidebarModule", []).controller("SidebarController", SidebarController);

    SidebarController.$inject = ["$scope","$rootScope", "$location", "AUTH_EVENTS", "AuthService"];
    
    function SidebarController($scope,$rootScope, $location, AUTH_EVENTS, AuthService) {
        var vm = this;
console.log("sidebar");
        vm.logout = function(){
            AuthService.logout();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };

        vm.isActiveState = function(location){
            return $location.url().indexOf(location) !== -1;
        };
            
    }
})();

