(function(){
    angular.module('intPortfolioModule')
        .controller('addIntPortfolioCtrl', addIntPortfolioCtrl)

    addIntPortfolioCtrl.$inject = ["$scope","$stateParams", "serverActService", "$rootScope"];

    function addIntPortfolioCtrl($scope,   serverActService, $rootScope) {
        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.dateOptions = {
            datepickerMode: "'month'",
            minMode: "month",
            formatMonth: "MMMM"
        };

        $scope.formats = ["MMMM yyyy", "yyyy/MM", "dd.MM.yyyy"];
        $scope.format = $scope.formats[0];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.addProject = function(){
        console.log($scope.project);
            serverActService.addIntProject($scope.project).then(function (response) {

            });
        };

        initForm();

        function initForm() {
            if(!$rootScope.project){ return; }
            $scope.project = $rootScope.project;
            $rootScope.project = null;
        }
    }
})();






