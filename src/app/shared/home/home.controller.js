(function(){
    "use strict";

    angular.module("homeModule").controller("HomeController",  HomeController);
  
    HomeController.$inject = ["$scope",  "USER_ROLES", "AuthService", "UserService"];
    function HomeController ($scope,   USER_ROLES, AuthService, UserService) {
        $scope.currentUser = UserService.getUser();
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
    }
})();
