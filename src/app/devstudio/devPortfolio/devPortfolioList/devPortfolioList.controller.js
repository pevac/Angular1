(function(){
    angular.module('devPortfolioModule',[])
        .controller('devPortfolioListCtrl', devPortfolioListCtrl);

    devPortfolioListCtrl.$inject = ["$scope", "$rootScope", "serverActService", "serverDataService", "$state"];
    function devPortfolioListCtrl($scope,  $rootScope, serverActService, serverDataService, $state){
        $scope.goToEdit = function(project, stateToGo) {
            $rootScope.project = project;
            $state.go( stateToGo, { previousState : { name : $state.current.name } }, {} );
        };

        $scope.publish = function(project){
            var newProject = project;
            newProject.draft = !project.draft;
            if(newProject.draft) { newProject.inTop = false }
            addDevProject(newProject)
        };

        $scope.changeTop = function(project){
           serverDataService.getDevProjects().then(function (data) {
                var _isCheckTop = isCheckTop(data);
               if(_isCheckTop && project.inTop || project.inTop && !_isCheckTop || !project.inTop && _isCheckTop){
                    var newProject = project;
                    newProject.inTop = !newProject.inTop;
                    addDevProject(project);
               }else{
                    alert("Кількість проектів з зафарбованою зіркою не більше 4");
               }
            });
           
        };

        function  addDevProject(data){
            serverActService.addDevProject(data).then(function (response) {
                  getProjects();
            });
        };

        

        function isCheckTop(arg){
            var projects = arg;
            var inTop = true;
            var index=0;
            for(var i = 0; i < projects.length; i++){
                if(!projects[i].draft  && projects[i].inTop) {
                    index++;
                }
                if(index >= 4){
                    inTop = false;
                    // break;
                }
            }

            return inTop;
        }

        function getProjects(){
            serverDataService.getDevProjects().then(function (data) {
                $scope.projects = data;
            });
        };

        getProjects();

    }
})();

