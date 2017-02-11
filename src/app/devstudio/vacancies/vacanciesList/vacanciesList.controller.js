(function () {
    "use strict"
    angular.module("vacancyModule", [])
        .controller("vacanciesController",vacanciesController);

    vacanciesController.$inject  = ["$scope", "$rootScope", "serverDataService"];
    function vacanciesController($scope, $rootScope, serverDataService) {
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

        function getJobPositions() {
            serverDataService.getJobPositions().then(function (data) {
                $scope.jobPositions = data;
            });
        };

        function getWorkingTimes(){
            serverDataService.getWorkingTimes().then(function(data){
                $scope.workingTimes = data;
            });
        };

        function getDevProjects() {
            serverDataService.getDevProjects().then(function (data) {
                $scope.projects = data;
            })
        };

        
        (function(){
            getJobPositions();
            getDevProjects();
            getVacancies();
            getWorkingTimes();
        })()
    };
})();


