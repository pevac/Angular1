(function(){
    "use strict"
    
    angular.module("usersModule").controller("UsersController", UsersController);
    UsersController.$inject = ["$scope", "serverDataService"]

    function UsersController($scope, serverDataService){
        
        $scope.getProjects = function(){
            $scope.projects = serverDataService.getIntProjects().then(function (data) {
                $scope.projects = data;
            });;
        };

        $scope.projectJson = function (obj) {
            return JSON.stringify(obj);
        };

        (function(){
            $scope.getProjects();
        })()
    }
})();