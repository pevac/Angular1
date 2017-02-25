(function(){
    angular.module('intPortfolioModule')
        .controller('addIntPortfolioCtrl', addIntPortfolioCtrl)

    addIntPortfolioCtrl.$inject = ["$scope", "serverActService", "$timeout", "$state", "serverDataService"];

    function addIntPortfolioCtrl($scope,  serverActService, $timeout, $state, serverDataService) {
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

        activate();

        function activate() {
            if ($state.params.data && $state.params.data.project) {
                $scope.project  = $state.params.data.project;

                $scope.project.dateStart  = new Date($scope.project.dateStart);
                $scope.project.dateEnd  = new Date($scope.project.dateEnd);

                // if(!vm.previewImg) setImage(vm.project.img, vm.project.id, "img");
            }
        };
    }
})();






