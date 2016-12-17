angular.module("angularApp").controller("SidebarController", function ($scope,$rootScope, $location) {
    $scope.currentUser = $rootScope.currentUser;

    $scope.isActive = function (viewLocation) {
        var active = ($location.path().indexOf(viewLocation) !== -1);
        return active;
    };


})