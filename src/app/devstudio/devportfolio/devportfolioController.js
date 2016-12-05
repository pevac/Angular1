angular.module('devPortfolioModule',[])
    .controller('devPortfolioCtrl', devPortfolioCtrl);

function devPortfolioCtrl($scope, serverDataService){
    $scope.getProjects = function(){
        $scope.projects = serverDataService.getProjects();
    };

    (function(){
        $scope.getProjects();
    })()
}