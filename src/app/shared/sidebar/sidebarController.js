angular.module("angularApp").controller("SidebarController", function ($scope) {

    $scope.status = {
        isopen1: false,
        isopen2: false
    };

    $scope.toggled1 = function(open) {
        $scope.status.isopen1 = !open;
    };
    $scope.toggled2 = function(open) {
        $scope.status.isopen2 = !open;
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
})