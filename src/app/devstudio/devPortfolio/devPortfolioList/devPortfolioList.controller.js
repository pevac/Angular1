(function(){
    angular.module('devPortfolioModule',[])
        .controller('devPortfolioListCtrl', devPortfolioListCtrl);

    devPortfolioListCtrl.$inject = ["$scope", "$rootScope", "serverDataService"]
    function devPortfolioListCtrl($scope,  $rootScope, serverDataService){
        $scope.goToEdit = function(project) {
            $rootScope.project = project;
        };

        function getProjects(){
            serverDataService.getDevProjects().then(function (data) {
                $scope.projects = data;
            });
        };

        (function(){
            getProjects();
        })()
    }
})();

