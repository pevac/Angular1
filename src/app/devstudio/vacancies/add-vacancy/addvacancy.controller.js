    angular.module('vacancyModule')
        .controller('addVacancyCtrl', addVacancyCtrl);

    addVacancyCtrl.$inject = ['$scope', 'serverActService', 'serverDataService', '$stateParams']
    function addVacancyCtrl($scope, serverActService, serverDataService, $stateParams){

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2040, 5, 22),
            minDate: new Date(),
            startingDay: 1,
        };


        $scope.open = function() {
            $scope.popup.opened = true;
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];


        $scope.popup = {
            opened: false
        };


        $scope.addVacancy = function () {
            serverActService.addVacancy($scope.newVacancy).then(function (response) {
            });
        }

        
        $scope.getJobPositions = function () {
            serverDataService.getJobPositions().then(function (data) {
                $scope.jobPositions = data;
            })
        };

         $scope.getDevProjects = function () {
            serverDataService.getDevProjects().then(function (data) {
                $scope.projects = data;
            })
        };

        (function(){
            initForm();
            $scope.getJobPositions();
            $scope.getDevProjects();
        })();

        function initForm() {
            if(!$stateParams.vacancy){ return; }
            $scope.project = JSON.parse($stateParams.vacancy)
        };
    }



