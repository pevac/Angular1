var app = angular.module('vacancyApp', []);
app.controller('vacancyController', function($scope, $http) {
    $http.get("http://localhost:8080/api/vacancies")
        .then(function(response) {
            $scope.vacancies = response.data;
        });
});