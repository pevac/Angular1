(function(){
 angular.module('workModule',[])
        .controller('WorkController', WorkController);

    WorkController.$inject = ["$scope", "$http", "$state", "Resources", "workingTimes", "jobPositions"];

    function WorkController($scope,  $http, $state, Resources, workingTimes, jobPositions){
        var vm = this;
       vm.jobPositions = jobPositions;
       vm.workingTimes = workingTimes;

       vm.jobPosition = new Resources.JobPositions();
       vm.workingtime = new Resources.WorkingTimes();

       vm.addWorkTimes = function () {
            var action = vm.workingtime.id ? "$update" : "$save";
            vm.workingtime[action](function(){$state.reload()});
        }

        vm.addJobPosition = function () {
            var action = vm.jobPosition.id ? "$update" : "$save";
            vm.jobPosition[action](function(){ $state.reload()});
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
            .state("home.dictionares", {
                url: "/dictionares",
                templateUrl:"work/work.html",
                controller: "WorkController",
                controllerAs: "vm",
                resolve: {
                    /* @ngInject */
                    jobPositions:  function(Resources) {
                       return  Resources.JobPositions.query().$promise;
                    },
                    /* @ngInject */
                    workingTimes:function(Resources) {
                       return  Resources.WorkingTimes.query().$promise;
                    } 
                },
            })

    }
})();