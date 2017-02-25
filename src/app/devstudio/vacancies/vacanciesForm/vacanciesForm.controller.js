(function(){
    angular.module("vacancyModule")
        .controller("AddVacancyController", AddVacancyController);

    AddVacancyController.$inject = ["$scope", "serverActService", "$state",  "projects", "jobPositions", "workingTimes"]
    function AddVacancyController($scope, serverActService, $state,   projects, jobPositions, workingTimes){
        var vm = this;
        var vacancy = {};

        vm.workingTimes = workingTimes;
        vm.jobPositions = jobPositions;
        vm.projects = projects;

        vm.dateOptions = {
            datepickerMode: "'month'",
            minMode: "month"
        };
       
        vm.formats = ["MMMM yyyy", "MMMM-yyyy", "yyyy/MM", "dd.MM.yyyy"];
        vm.format = vm.formats[0];

        vm.popup = {
            opened: false
        };

        vm.open = function() {
            vm.popup.opened = true;
        };

        vm.addVacancy = function (open, vacancy) {
            vm.dataLoading =true;
            var newVacancy = vacancy;
            newVacancy.open = open;
            serverActService.addVacancy(newVacancy).then(function (response) {
                vm.dataLoading =false;
                $state.go("home.vacancies.list");
            });
        };

      
        activate();

        function activate() {
            if ($state.params.data && $state.params.data.vacancy) {
                vm.vacancy  = $state.params.data.vacancy;
            }
        };

    }
})();
    
   



