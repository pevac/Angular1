    angular.module('addVacancyModule',[])
        .controller('addVacancyCtrl', ['$scope', 'serverActService', 'serverDataService', addVacancy]);

    function addVacancy($scope, serverActService, serverDataService){

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

        
        $scope.getJobPositions = function () {
            serverDataService.getJobPositions().then(function (data) {
                console.log(data);
                $scope.jobPositions = data;
            })
        };

         $scope.getDevProjects = function () {
            serverDataService.getDevProjects().then(function (data) {
                console.log(data);
                $scope.projects = data;
            })
        };

        (function(){
            $scope.getJobPositions();
             $scope.getDevProjects();
        })()
    }



