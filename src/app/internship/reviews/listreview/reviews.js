angular.module('reviewsModule')
    .controller('reviewCtrl', reviewCtrl);

function reviewCtrl($scope, $state , serverDataService){
    $scope.getProjects = function(){
        serverDataService.getDevProjects().then(function (data) {
            $scope.projects = data;
        });
    };

    $scope.reviewJson = function (obj) {
        return JSON.stringify(obj);
    };

    // $scope.goToEdit = function(project) {
    //     $state.go('home.devportfolio.editportfolio', {project: JSON.stringify(project)} );
    // };


    // (function(){
    //     $scope.getProjects();
    // })()
}
