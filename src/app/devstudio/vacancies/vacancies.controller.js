(function () {
    'use strict'
    angular.module('vacancyApp', [])
    .controller('vacanciesController', function($scope, serverDataService) {
        var self = this;
        self.getVacancies = function(){
            serverDataService.getVacancies().then(function (data) {
                self.vacancies = data;
            });
        };

        (function(){
            self.getVacancies();
        })()
    });
})();
