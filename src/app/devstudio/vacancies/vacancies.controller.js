    'use strict'
    angular.module('vacancyModule', [])
        .controller('vacanciesController',vacanciesController);


    function vacanciesController($scope, serverDataService) {
        var self = this;
        $scope.getVacancies = function(){
            serverDataService.getVacancies().then(function (data) {
                $scope.vacancies = data;
            });
        };

        (function(){
            $scope.getVacancies();
        })()
    }

