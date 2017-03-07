(function(){
    "use strict";

    angular.module("vacancyModule").controller("AddVacancyController", AddVacancyController);
    AddVacancyController.$inject = ["$scope",  "$state",  "projects", "jobPositions", "workingTimes",  "Resources"];
    
    /* @ngInject */
    function AddVacancyController($scope,  $state,   projects, jobPositions, workingTimes, Resources){
        var vm = this;

        vm.workingTimes = workingTimes;
        vm.jobPositions = jobPositions;
        vm.projects = projects;

        activate();

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

        vm.addVacancy = function (open) {
            var action = vm.vacancy.id ? "$update" : "$save";
            vm.dataLoading =true;
            vm.vacancy.open = open;
            vm.vacancy[action](
                function (response) {
                    vm.dataLoading =false;
                    $state.go("home.vacancies.list");
                }
            );
        };

        function activate() {
            vm.vacancy = new Resources.Vacancies();
            if ($state.params.data && $state.params.data.vacancy) {
                vm.vacancy  = $state.params.data.vacancy;
                vm.vacancy.date = new Date(vm.vacancy.date);
            }
        };
    }
})();
    
   



