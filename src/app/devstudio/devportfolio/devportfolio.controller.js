angular.module('devPortfolioModule',[])
    .controller('devPortfolioCtrl', devPortfolioCtrl);

function devPortfolioCtrl($scope, serverDataService){
    $scope.getProjects = function(){
        $scope.projects = serverDataService.getDevProjects();
    };

    (function(){
        $scope.getProjects();
    })()
}