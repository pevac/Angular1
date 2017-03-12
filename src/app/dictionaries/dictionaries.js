(function(){
 angular.module("dictionariesModule",[])
        .controller("DictionariesController", DictionariesController);

    DictionariesController.$inject = ["$scope", "$http", "$state", "Resources", "workingTimes", "jobPositions"];

    function DictionariesController($scope,  $http, $state, Resources, workingTimes, jobPositions){
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

angular.module("dictionariesModule").config(RouterConfig1);
    RouterConfig1.$inject = ["$stateProvider"];

    function RouterConfig1($stateProvider){

        $stateProvider
            .state("home.dictionares", {
                url: "/dictionares",
                templateUrl:"dictionaries/dictionaries.tmpl.html",
                controller: "DictionariesController",
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