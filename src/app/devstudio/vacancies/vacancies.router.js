(function(){
    "use strict";

    angular.module("vacancyModule").config(VacancyConfig);
    VacancyConfig.$inject = ["$stateProvider"];

    function VacancyConfig($stateProvider){

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
            .state("home.feedback", {
                url: "/feedback",
                templateUrl:"devstudio/vacancies/vacancyFeedback/vacancyFeedback.tmpl.html",
                controller: "VacanciesFeedbackController",
                controllerAs: 'vm',
            });

            clearSessionStorage.$inject = [ "$sessionStorage"];
            function clearSessionStorage($sessionStorage){
                delete    $sessionStorage.stateParams;
            }

            saveSessionStorage.$inject = [ "$stateParams", "$sessionStorage"];
            function saveSessionStorage($stateParams, $sessionStorage){
                var stateParams;
                if(!$sessionStorage.stateParams){
                    stateParams = angular.copy($stateParams);
                    $sessionStorage.$default({stateParams: stateParams} );
                } 
                if($stateParams.data) {
                    stateParams = angular.copy($stateParams);
                    $sessionStorage.stateParams = stateParams;
                } else {
                    for(var key in $sessionStorage.$default().stateParams){
                        $stateParams[key] = $sessionStorage.$default().stateParams[key];
                    }
                }
            }
    }
})();