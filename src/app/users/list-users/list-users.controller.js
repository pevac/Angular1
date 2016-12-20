(function(){
    angular.module('usersModule',[])
        .controller('usersCtrl', usersCtrl);

    usersCtrl.$inject = ["$scope", "serverDataService"]

    function usersCtrl($scope, serverDataService){
        
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