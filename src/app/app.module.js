 angular.module("angularApp", ["ui.bootstrap", "ui.router"]);

 angular.module("angularApp").controller("appController", function ($scope,$rootScope, USER_ROLES,AuthService, $location) {
   $scope.currentUser = null;
   $scope.userRoles = USER_ROLES;
   $scope.isAuthorized = AuthService.isAuthorized;

   $scope.setCurrentUser = function (user) {

    $scope.currentUser = user;
       $rootScope.currentUser = user;

       console.log($rootScope.currentUser);

   }

   $scope.alertfn= function () {
       console.log("hello");
   }
 });

