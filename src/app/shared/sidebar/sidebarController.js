(function(){
    angular.module("angularApp").controller("SidebarController", SidebarController);

    SidebarController.$inject = ["$scope","$rootScope", "$location", "USER_ROLES", "AuthService"];
    
    function SidebarController($scope,$rootScope, $location, USER_ROLES,AuthService) {
            $scope.currentUser = $rootScope.currentUser;
            $scope.userRoles = USER_ROLES;
            $scope.isAuthorized = AuthService.isAuthorized;
            // $scope.isActive = function (viewLocation) {
            //     var active = ($location.path().indexOf(viewLocation) !== -1);
            //     return active;
            // };
    }
})();

