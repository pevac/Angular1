'use strict'
angular.module('vacancyModule')
    .controller('reviewVacanciesController',reviewVacanciesController);

reviewVacanciesController.$inject  = ['$scope', 'serverDataService']
function reviewVacanciesController($scope, serverDataService) {
    var self = this;
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
