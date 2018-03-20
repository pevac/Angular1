(function () {
    "use strict"

    angular.module("vacancyModule").controller("VacanciesFeedbackController",VacanciesFeedbackController);
    VacanciesFeedbackController.$inject  = ["$scope", "$state"];
    
    /* @ngInject */
    function VacanciesFeedbackController($scope, $state) {
        var vm = this;
        
        vm.itemsByPage = 10;

        vm.goTo = function (){
            $state.go("home");
        }
    }
})();
