(function(){
    angular.module('intPortfolioModule',[])
        .controller('intPortfolioListCtrl', intPortfolioListCtrl);

    intPortfolioListCtrl.$inject = ["$scope", "serverDataService"]

    function intPortfolioListCtrl($scope, serverDataService){
        
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


