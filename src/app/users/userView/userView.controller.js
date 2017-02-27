(function(){
    "use strict"

    angular.module("usersModule").controller("ViewUserController", ViewUserController);
    ViewUserController.$inject = ["$scope","$stateParams", "$rootScope"];

    function ViewUserController($scope, $stateParams ,$rootScope) {

        initForm();

        function initForm() {
            if(!$rootScope.project){ return; }
            $scope.project = $rootScope.project;
            $rootScope.project = null;
        }
    }
})();