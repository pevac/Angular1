(function(){
    angular.module('intPortfolioModule',[])
        .controller('intPortfolioListCtrl', intPortfolioListCtrl);

    intPortfolioListCtrl.$inject = ["$scope", "$rootScope", "serverActService", "serverDataService"]

    function intPortfolioListCtrl($scope,  $rootScope, serverActService, serverDataService){
        
        $scope.goToEdit = function(project) {
            $rootScope.project = project;
        };

       
        $scope.publish = function(project){
            project.draft = !project.draft;
              serverActService.addDevProject(project).then(function (response) {
                  getProjects();
            },
            function (response) {
                console.log(response);
            });
        };

        $scope.changeTop = function(project){
            project.inTop = !project.inTop;
              serverActService.addDevProject(project).then(function (response) {
                //    $scope.showModal = true;
                // $scope.open();
                  getProjects();
            },
            function (response) {
                console.log(response);
            });
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


