(function(){
    angular.module('vacancyModule')
        .controller('addVacancyCtrl', addVacancyCtrl);

    addVacancyCtrl.$inject = ['$scope', 'serverActService', '$rootScope', 'serverDataService', '$stateParams']
    function addVacancyCtrl($scope, serverActService, $rootScope,  serverDataService, $stateParams){

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.dateOptions = {
            datepickerMode: "'month'",
            minMode: "month"
        };

        $scope.formats = ["MMMM yyyy", "yyyy/MM", "dd.MM.yyyy", "shortDate"];
        $scope.format = $scope.formats[0];

        $scope.popup = {
            opened: false
        };

        $scope.open = function() {
            $scope.popup.opened = true;
        };


        $scope.addVacancy = function () {
            serverActService.addVacancy($scope.vacancy).then(function (response) {

            });
        };

       $scope.getJobPositions = function () {
            serverDataService.getJobPositions().then(function (data) {
                $scope.jobPositions = data;
            });
        };

        $scope.getWorkingTimes = function (){
            serverDataService.getWorkingTimes().then(function(data){
                console.log(data);
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
            initForm();
        })();



        function initForm() {
            if(!$rootScope.vacancy){ return; }
            $scope.vacancy = $rootScope.vacancy;
            $rootScope.vacancy = null;
        }

    }
})();
    
   



