(function(){
 angular.module('workModule',[])
        .controller('workController', workController);

    workController.$inject = ["$scope", "$http","serverApiConstant", "serverActService", "serverDataService"];

    function workController($scope, $http,serverApiConstant, serverActService, serverDataService){

        $scope.addWorkTimes = function (data) {
        var method = data.id ? "PUT" : "POST";
             var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.url+serverApiConstant.workingTimes : 
                    serverApiConstant.url+serverApiConstant.workingTimes + "/" + data.id;
                $http({
                    method:method,
                    url: url1,
                    data: data
                })
                    .then(function (response) {
                        
                    })
        }

      $scope.addJobPosition = function (data) {
        var method = data.id ? "PUT" : "POST";
             var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.url+serverApiConstant.jobPositions : 
                    serverApiConstant.url+serverApiConstant.jobPositions + "/" + data.id;
                $http({
                    method: method,
                    url:  url1,
                    data: data
                })
                    .then(function (response) {
                        
                    })
        }

        
    $scope.getJobPositions = function () {
            serverDataService.getJobPositions().then(function (data) {
                $scope.jobPositions = data;
            })
        };

 $scope.getWorkingTimes = function (){
            serverDataService.getWorkingTimes().then(function(data){
                $scope.workingTimes = data;
            });
        };

     (function(){
            $scope.getJobPositions();
            $scope.getWorkingTimes();
        })();




        $scope.deleteJob = function(job){
                     $http({
                    method: "DELETE",
                    url: serverApiConstant.url+serverApiConstant.jobPositions  + job.id,
                })
                    .then(function (response) {
                        
                    })
        }

           $scope.editJob = function(job){
               $scope.jobPosition = job;
            }

             $scope.editWorkingTime = function(workingtimes){
               $scope.workingtimes = workingtimes;
            }

        
    }
})();