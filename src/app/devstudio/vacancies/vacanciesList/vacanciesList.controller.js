(function () {
    "use strict"
    
    angular.module("vacancyModule").controller("VacanciesController", VacanciesController);
    VacanciesController.$inject  = ["$scope", "$state", "vacancies", "Resources"];

    /* @ngInject */
    function VacanciesController($scope, $state,  vacancies, Resources) {
        var vm = this;
        vm.vacancies = vacancies;
        
        vm.goToEdit = function(vacancy, stateToGo) {
            $state.go( stateToGo, {  data: {vacancy: vacancy} }, { } );
        };

        vm.deleteVacancy = function(vacancy, index){
            var checkDelete = confirm("Видалити вакансії")
            if(!checkDelete) return;
            vacancy.$remove(
                function () {
                    vm.vacancies.splice(index, 1);
                }
            );
        };

    };
})();


