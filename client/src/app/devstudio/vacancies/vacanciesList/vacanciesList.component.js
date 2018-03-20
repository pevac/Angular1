(function(){
    angular.module("devPortfolioModule").component("vacancies", {
        templateUrl: "app/devstudio/vacancies/vacanciesList/vacanciesList.tmpl.html",
        controller: "VacanciesController",
        controllerAs: "vm",
        bindings: {
            vacancies: "<",
        }
    });

})();