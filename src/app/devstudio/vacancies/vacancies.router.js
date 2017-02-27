(function(){
    "use strict";

    angular.module("vacancyModule").config(VacancyConfig);
    VacancyConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];

    function VacancyConfig($stateProvider, $urlRouterProvider, USER_ROLES){

        $stateProvider
            .state("home.vacancies", {
                url: "/vacancies",
                template:'<div  ui-view ></div>',
                abstract: true
            })
            .state("home.vacancies.list", {
                url: "/list",
                templateUrl:"devstudio/vacancies/vacanciesList/vacanciesList.tmpl.html",
                controller: "VacanciesController",
                controllerAs: 'vm',
                resolve: {
                    /* @ngInject */
                    vacancies:  function(serverDataService) {
                        return  serverDataService.getVacancies();
                    }
                }
            })
            .state("home.vacancies.addvacancy", {
                url: "/add",
                templateUrl:"devstudio/vacancies/vacanciesForm/vacanciesForm.tmpl.html",
                controller: "AddVacancyController",
                controllerAs: 'vm',
                resolve: {
                    /* @ngInject */
                    jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    },
                    /* @ngInject */
                    projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    },
                    /* @ngInject */
                    workingTimes:function(serverDataService) {
                       return  serverDataService.getWorkingTimes();
                    } 
                }
            })
            .state("home.vacancies.edit", {
                url: "/edit",
                templateUrl:"devstudio/vacancies/vacanciesForm/vacanciesForm.tmpl.html",
                controller: "AddVacancyController",
                controllerAs: 'vm',
                params : {
                    data: null
                },
                resolve: {
                    /* @ngInject */
                    jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    },
                    /* @ngInject */
                    projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    },
                    /* @ngInject */
                    workingTimes:function(serverDataService) {
                       return  serverDataService.getWorkingTimes();
                    } 
                },
                // onEnter: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                //         if($stateParams.data) {
                //             $sessionStorage.$default({stateParams: {data:  $stateParams.data }} );
                //         } else {
                //             $stateParams.data = $sessionStorage.$default().stateParams.data;
                //         }
                // }],
                // onExit: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                //         delete    $sessionStorage.$default().stateParams;
                // }]
            })
            .state("home.vacancies.review", {
                url: "/review",
                templateUrl:"devstudio/vacancies/reviewVacancies/reviewVacancies.tmpl.html",
                controller: "ReviewVacanciesController",
                controllerAs: 'vm',
            })
    }
})();