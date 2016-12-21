(function(){
    angular.module('devPortfolioModule',[])
        .controller('devPortfolioListCtrl', devPortfolioListCtrl);

    devPortfolioListCtrl.$inject = ["$scope", "$rootScope", "serverDataService"]
    function devPortfolioListCtrl($scope,  $rootScope, serverDataService){
        $scope.getProjects = function(){
                serverDataService.getDevProjects().then(function (data) {
                    $scope.projects = data;
                });
        };

        $scope.projectJson = function (obj) {
            return JSON.stringify(obj);
        };


        $scope.goToEdit = function(project) {
            $rootScope.project = project;
        };

        (function(){
            $scope.getProjects();
        })()
    }
})();

