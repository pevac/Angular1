(function(){
    "use strict";

    angular.module("vacancyModule").config(VacancyConfig);
    VacancyConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];

    function VacancyConfig($stateProvider, $urlRouterProvider, USER_ROLES){

        $stateProvider
            .state("home.vacancies", {
                url: "/vacancies",
                template:"<div  ui-view ></div>",
                abstract: true,
                resolve: {
                    Resources: "Resources"
                }
            })
            .state("home.vacancies.list", {
                url: "/list",
                templateUrl:"devstudio/vacancies/vacanciesList/vacanciesList.tmpl.html",
                controller: "VacanciesController",
                controllerAs: 'vm',
                resolve: {
                    /* @ngInject */
                    vacancies:  function(Resources) {
                        return  Resources.Vacancies.query().$promise;
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
                    jobPositions:  function(Resources) {
                       return  Resources.JobPositions.query().$promise;
                    },
                    /* @ngInject */
                    projects:  function(Resources) {
                       return  Resources.DevProjects.query().$promise;
                    },
                    /* @ngInject */
                    workingTimes:function(Resources) {
                       return  Resources.WorkingTimes.query().$promise;
                    } 
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
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
                    jobPositions:  function(Resources) {
                       return  Resources.JobPositions.query().$promise;
                    },
                    /* @ngInject */
                    projects:  function(Resources) {
                       return  Resources.DevProjects.query().$promise;
                    },
                    /* @ngInject */
                    workingTimes:function(Resources) {
                       return  Resources.WorkingTimes.query().$promise;
                    } 
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.vacancies.review", {
                url: "/review",
                templateUrl:"devstudio/vacancies/reviewVacancies/reviewVacancies.tmpl.html",
                controller: "ReviewVacanciesController",
                controllerAs: 'vm',
            });

            clearSessionStorage.$inject = [ "$sessionStorage"];
            function clearSessionStorage($sessionStorage){
                delete    $sessionStorage.stateParams;
            }

            saveSessionStorage.$inject = [ "$stateParams", "$sessionStorage"];
            function saveSessionStorage($stateParams, $sessionStorage){
                if(!$sessionStorage.stateParams){
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.$default({stateParams: $stateParams} );
                } 
                if($stateParams.data) {
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.stateParams = $stateParams;
                } else {
                    $stateParams.data = $sessionStorage.$default().stateParams.data;
                }
            }
              
    }
})();