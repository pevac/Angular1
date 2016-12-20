(function(){
    angular.module('intPortfolioModule')
        .controller('addIntPortfolioCtrl', addIntPortfolioCtrl)

    addIntPortfolioCtrl.$inject = ["$scope","$stateParams", "serverActService", "$rootScope"];

    function addIntPortfolioCtrl($scope,   serverActService, $rootScope) {
        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2040, 5, 22),
            minDate: new Date(),
            startingDay: 1,
        };

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
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






