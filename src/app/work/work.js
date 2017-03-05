(function(){
 angular.module('workModule',[])
        .controller('WorkController', WorkController);

    WorkController.$inject = ["$scope", "$http", "Resources", "workingTimes", "jobPositions"];

    function WorkController($scope, $http, Resources, workingTimes, jobPositions){
        var vm = this;
       vm.jobPositions = jobPositions;
       vm.workingTimes = workingTimes;


       vm.addWorkTimes = function (data) {
            return Resources.WorkingTimes.save(data);
        }

        vm.addJobPosition = function (data) {
           return  Resources.JobPositions.save(data);
        }

       vm.deleteJob = function(job){
            return  Resources.JobPositions.remove(job.id);
        }

        vm.deleteTime = function(job){
            return  Resources.JobPositions.remove(job);
        }


       vm.editJob = function(job){
           vm.jobPosition = angular.copy(job);
        }

       vm.editWorkingTime = function(workingtime){
           vm.workingtime = angular.copy(workingtime);
        }

        
    }

angular.module("workModule").config(RouterConfig1);
    RouterConfig1.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];

    function RouterConfig1($stateProvider, $urlRouterProvider, USER_ROLES){

        $stateProvider
            .state("home.works", {
                url: "/works",
                templateUrl:"work/work.html",
                controller: "WorkController",
                controllerAs: "vm",
                resolve: {
                    /* @ngInject */
                    jobPositions:  function(Resources) {
                       return  Resources.JobPositions.getAll();
                    },
                    /* @ngInject */
                    workingTimes:function(Resources) {
                       return  Resources.WorkingTimes.getAll();
                    } 
                },
            })

    }
})();