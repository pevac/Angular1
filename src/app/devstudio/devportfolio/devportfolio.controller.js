angular.module('devPortfolioModule',[])
    .controller('devPortfolioCtrl', devPortfolioCtrl);

function devPortfolioCtrl($scope, serverDataService){
    $scope.getProjects = function(){
            serverDataService.getDevProjects().then(function (data) {
                console.log(data);
                $scope.projects = data;
            });
    };

    (function(){
        $scope.getProjects();
    })()
}

