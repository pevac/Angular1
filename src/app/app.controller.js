(function(){
    angular.module('angularApp')
    .controller("appController", ['$scope','$rootScope', 'USER_ROLES','AuthService', appCtrl]);


function appCtrl ($scope, $rootScope, USER_ROLES, AuthService) {
    // $scope.currentUser = null;
    // $scope.userRoles = USER_ROLES;
    // $scope.isAuthorized = AuthService.isAuthorized;

    // $scope.setCurrentUser = function (user) {
    //     $scope.currentUser = user;
    //     $rootScope.currentUser = user;
    //     console.log($rootScope.currentUser);
    // };

    // $scope.alertfn= function () {
    //     console.log("hello");
    // }
}
})();

