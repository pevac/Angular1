angular.module("angularApp").controller("HomeController", function ($scope,$rootScope, USER_ROLES,AuthService) {
    $scope.currentUser = $rootScope.currentUser;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
});


