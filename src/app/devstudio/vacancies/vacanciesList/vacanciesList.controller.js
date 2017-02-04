(function () {
    "use strict"
    angular.module("vacancyModule", [])
        .controller("vacanciesController",vacanciesController);

    vacanciesController.$inject  = ['$scope', 'serverDataService']
    function vacanciesController($scope, serverDataService) {
        $scope.goToEdit = function(vacancy) {
            $rootScope.vacancy = vacancy;
        };

        $scope.setJobPosition = function(job){
            var jobPosition = "";
           for(var i = 0; i< $scope.jobPositions.length; i++){
               if(job.id == $scope.jobPositions[i].id){
                   jobPosition =  $scope.jobPositions[i];
               }
           }
           return jobPosition.name;
        }

        $scope.setProject = function(arg){
            var project = "";
           for(var i = 0; i< $scope.projects.length; i++){
               if(arg.id == $scope.projects[i].id){
                   project =  $scope.projects[i];
               }
           }
           return project.name;
        }

        function getVacancies(){
            serverDataService.getVacancies().then(function (data) {
                $scope.vacancies = data;
            });
        };  

           $scope.getJobPositions = function () {
            serverDataService.getJobPositions().then(function (data) {
                $scope.jobPositions = data;
            });
        };

        $scope.getWorkingTimes = function (){
            serverDataService.getWorkingTimes().then(function(data){
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
            getVacancies();
            $scope.getWorkingTimes();
        })()
    };
})();


