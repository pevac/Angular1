(function(){
    angular.module("sidebarModule", []).controller("SidebarController", SidebarController);

    SidebarController.$inject = ["$scope","$rootScope", "AUTH_EVENTS", "AuthService"];
    
    function SidebarController($scope,$rootScope, AUTH_EVENTS, AuthService) {
        var vm = this;

        vm.logout = function(){
            AuthService.logout();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };
            
    }
})();

