(function () {
    "use strict"
    angular.module("vacancyModule", []);
    
    angular.module("vacancyModule")
        .controller("VacanciesController", VacanciesController);

    VacanciesController.$inject  = ["$scope", "$state", "serverDataService", "serverActService", "vacancies"];
    function VacanciesController($scope, $state, serverDataService, serverActService, vacancies) {
        var vm = this;
        vm.vacancies = vacancies;
        
        vm.goToEdit = function(vacancy, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {vacancy: vacancy} }, {reload: true} );
        };

        vm.deleteVacancy = function(vacancy, index){
            var checkDelete = confirm("Видалити вакансії")
            if(!checkDelete) return;
            serverActService.deleteVacancy(vacancy).then(function (response) {
                vm.vacancies.splice(index, 1);
                $state.reload();
            });
        };

    };
})();


