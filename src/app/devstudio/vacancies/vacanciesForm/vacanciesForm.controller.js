(function(){
    angular.module("vacancyModule")
        .controller("addVacancyCtrl", addVacancyCtrl);

    addVacancyCtrl.$inject = ["$scope", "serverActService", "$state", "serverDataService", "$timeout",  "_projects", "_jobPositions", "_workingTimes"]
    function addVacancyCtrl($scope, serverActService, $state,  serverDataService, $timeout,  _projects, _jobPositions, _workingTimes){
        var vm = this;
        var vacancy = {};

        console.log($state);
        vm.workingTimes = _workingTimes;
        vm.jobPositions = _jobPositions;
        vm.projects = _projects;

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
                $timeout(function () {
                    vm.dataLoading =false;
                    $state.go("home.vacancies.list");
                }, 1000);
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
    
   



