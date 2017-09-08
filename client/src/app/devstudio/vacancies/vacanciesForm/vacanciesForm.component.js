(function(){
    angular.module("devPortfolioModule").component("vacanciesForm", {
        templateUrl: "app/devstudio/vacancies/vacanciesForm/vacanciesForm.tmpl.html",
        controller: "VacancyFormController",
        controllerAs: "vm",
        bindings: {
            jobPositions: "<",
            projects: "<",
            workingTimes: "<",
        }
    });

})();