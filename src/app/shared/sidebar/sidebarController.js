angular.module("angularApp").controller("SidebarController", function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
})