    'use strict'
    angular.module('vacancyModule', [])
        .controller('vacanciesController',vacanciesController);

    vacanciesController.$inject  = ['$scope', 'serverDataService']
    function vacanciesController($scope, serverDataService) {
        $scope.getVacancies = function(){
            serverDataService.getVacancies().then(function (data) {
                $scope.vacancies = data;
            });
        };

        $scope.vacancyJson = function (obj) {
            return JSON.stringify(obj);
        };

        (function(){
            $scope.getVacancies();
        })()
    }

