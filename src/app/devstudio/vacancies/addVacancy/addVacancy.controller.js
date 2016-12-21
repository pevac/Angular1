(function(){
    angular.module('vacancyModule')
        .controller('addVacancyCtrl', addVacancyCtrl);

    addVacancyCtrl.$inject = ['$scope', 'serverActService', '$rootScope', 'serverDataService', '$stateParams']
    function addVacancyCtrl($scope, serverActService, $rootScope,  serverDataService, $stateParams){

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
            // console.log($scope.vacancy)
            serverActService.addVacancy($scope.vacancy).then(function (response) {
                
            });
        };

       $scope.initForm = function () {
            if(!$stateParams.vacancy){ return; }
            console.log($stateParams.vacancy);
            $scope.project = JSON.parse($stateParams.vacancy);
        };

       $scope.getJobPositions = function () {
            serverDataService.getJobPositions().then(function (data) {
                $scope.jobPositions = data;
            });
        };

        $scope.getWorkingTimes = function (){
            serverDataService.getWorkingTimes().then(function(){
                $scope.workingTimes = data;
            });
        };

        $scope.getDevProjects = function () {
            serverDataService.getDevProjects().then(function (data) {
                $scope.projects = data;
            })
        };

        (function(){
            $scope.getJobPositions();
            $scope.getDevProjects();
            $scope.getWorkingTimes();
            $scope.initForm();
        })();
        
    }
})();
    
   



