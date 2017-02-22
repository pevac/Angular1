(function () {
    "use strict"
    angular.module("vacancyModule", [])
        .controller("vacanciesController",vacanciesController);

    vacanciesController.$inject  = ["$scope", "$state", "serverDataService", "serverActService", "_vacancies", "_jobPositions", "_projects"];
    function vacanciesController($scope, $state, serverDataService, serverActService, _vacancies, _jobPositions, _projects) {
        var vm = this;

        vm.vacancies = _vacancies;
        var jobPositions = _jobPositions;
        var projects = _projects;
        
        vm.goToEdit = function(vacancy, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {vacancy: vacancy} }, {} );
        };

        vm.setJobPosition = function(job){
            var jobPosition = "";
            if(!jobPositions) return "";
            for(var i = 0; i<jobPositions.length; i++){
               if(job.id == jobPositions[i].id){
                   jobPosition =  jobPositions[i];
               }
            }
            return jobPosition.name;
        }

        vm.deleteVacancy = function(vacancy, index){
            var checkDelete = confirm("Видалити вакансії")
            if(!checkDelete) return;
            serverActService.deleteVacancy(vacancy).then(function (response) {
                vm.vacancies.splice(index, 1);
                getJobPositions();
                getDevProjects()
                getVacancies();
            });
        };

        vm.setProject = function(arg){
            var project = "";
            if(!projects ) return "";
           for(var i = 0; i< projects.length; i++){
               if(arg.id == projects[i].id){
                   project = projects[i];
               }
           }
           return project.name;
        }

        function getVacancies(){
            serverDataService.getVacancies().then(function (data) {
                vm.vacancies = data;
            });
        };  

        function getJobPositions() {
            serverDataService.getJobPositions().then(function (data) {
                jobPositions = data;
            });
        };

        function getDevProjects() {
            serverDataService.getDevProjects().then(function (data) {
                projects = data;
            })
        };

    };
})();


