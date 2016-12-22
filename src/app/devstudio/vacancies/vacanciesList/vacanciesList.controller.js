(function () {
    "use strict"
    angular.module("vacancyModule", [])
        .controller("vacanciesController",vacanciesController);

    vacanciesController.$inject  = ['$scope', 'serverDataService']
    function vacanciesController($scope, serverDataService) {
        $scope.goToEdit = function(vacancy) {
            $rootScope.vacancy = vacancy;
        };

        function getVacancies(){
            serverDataService.getVacancies().then(function (data) {
                $scope.vacancies = data;
            });
        };

        (function(){
            getVacancies();
        })()
    };
})();


