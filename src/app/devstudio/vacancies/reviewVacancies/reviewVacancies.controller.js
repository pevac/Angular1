(function () {
    "use strict"

    angular.module("vacancyModule").controller("ReviewVacanciesController",ReviewVacanciesController);
    ReviewVacanciesController.$inject  = ["$scope", "serverDataService"];
    
    /* @ngInject */
    function ReviewVacanciesController($scope, serverDataService) {
        var vm = this;
        $scope.itemsByPage = 10;

        $scope.getVacancies = function(){
                serverDataService.getVacancies().then(function (data) {
                $scope.vacancies = [];
                $scope.vacancies = data;
                $scope.vacanciesCollection = [].concat($scope.vacancies);
            });
        };

        (function(){
            $scope.getVacancies();
        })();
    }
})();
