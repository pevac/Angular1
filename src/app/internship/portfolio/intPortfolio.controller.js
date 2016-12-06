angular.module('intPortfolioModule',[])
    .controller('intPortfolioCtrl', intPortfolioCtrl);

function intPortfolioCtrl($scope, serverDataService){
    $scope.getProjects = function(){
        $scope.projects = serverDataService.getIntProjects();
    };

    (function(){
        $scope.getProjects();
    })()
}
