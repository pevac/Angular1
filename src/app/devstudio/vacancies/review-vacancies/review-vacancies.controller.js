'use strict'
angular.module('vacancyModule')
    .controller('reviewVacanciesController',reviewVacanciesController);

reviewVacanciesController.$inject  = ['$scope', 'serverDataService']
function reviewVacanciesController($scope, serverDataService) {
    var self = this;
    $scope.itemsByPage = 10;


    $scope.getVacancies = function(){
        serverDataService.getVacancies().then(function (data) {
            $scope.vacancies = data;
        });
    };

    $scope.vacancies = [{jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "APAM", project: "dfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
        {jobPosition: "EPAM", project: "afds@fsd", name: "Ivan", phone: "3434343", dataRegist: "10/12/12" },
        {jobPosition: "BPAM", project: "kfds@fsd", name: "Ivan", phone: "3434343", dataRegist: "12/12/12" },
       ]




    $scope.vacancyJson = function (obj) {
        return JSON.stringify(obj);
    };

    (function(){
        $scope.getVacancies();
    })();





}
