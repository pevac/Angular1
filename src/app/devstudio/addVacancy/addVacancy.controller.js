    angular.module('addVacancyModule',[])
        .controller('addVacancyCtrl', addVacancy);

    function addVacancy($scope, serverActService){
        $scope.newVacancy ={
            jobPosition:"",
            projectName: "",
            description: "",
            busyHour: "",
            addDescription: ""
        }

        $scope.addVacancy = function () {
            serverActService.addVacancy($scope.newVacancy).then(function (response) {

            });
        }
    }



