(function(){
    angular.module('usersModule')
    .controller('viewUserCtrl', viewUserCtrl);

    viewUserCtrl.$inject = ["$scope","$stateParams", "$rootScope"];
    function viewUserCtrl($scope, $stateParams ,$rootScope) {

        initForm();

        function initForm() {
            if(!$rootScope.project){ return; }
            $scope.project = $rootScope.project;
            $rootScope.project = null;
        }
    }
})();