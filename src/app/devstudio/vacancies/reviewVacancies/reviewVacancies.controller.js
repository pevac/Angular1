(function () {
    "use strict"
    angular.module("vacancyModule")
        .controller("reviewVacanciesController",reviewVacanciesController)


    reviewVacanciesController.$inject  = ["$scope", "serverDataService"]
    function reviewVacanciesController($scope, serverDataService) {
        var self = this;
        $scope.itemsByPage = 10;

        $scope.getVacancies = function(){
                serverDataService.getVacancies().then(function (data) {
                $scope.vacancies = [];
                $scope.vacancies = data;
                $scope.vacanciesCollection = [].concat($scope.vacancies);
            });
        };

        $scope.vacancyJson = function (obj) {
            return JSON.stringify(obj);
        };

        (function(){
            $scope.getVacancies();
        })();
    }
})();
