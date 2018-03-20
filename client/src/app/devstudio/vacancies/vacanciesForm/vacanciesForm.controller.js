(function(){
    "use strict";

    angular.module("vacancyModule").controller("VacancyFormController", VacancyFormController);
    VacancyFormController.$inject = ["$scope",  "$state", "Resources"];
    
    /* @ngInject */
    function VacancyFormController($scope,  $state, Resources){
        var vm = this;

        vm.$onInit = function () {
            activate();
        };

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
            var action = vm.vacancy.id ? "$update" : "$create";
            
            vm.dataLoading =true;
            vm.vacancy.open = open;
            vm.vacancy[action](
                function () {
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
        }
    }
})();
    
   



