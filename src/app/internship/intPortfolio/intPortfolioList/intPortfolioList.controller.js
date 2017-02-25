(function(){
    angular.module('intPortfolioModule',[])
        .controller('IntPortfolioListController', IntPortfolioListController);

    IntPortfolioListController.$inject = ["$scope", "serverActService", "serverDataService", "$state", "projects"];

    function IntPortfolioListController($scope,  serverActService, serverDataService, $state, projects){
        
        var vm = this;

        vm.projects = projects;

        console.log(vm.projects);

        vm.goToEdit = function(project, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {project: project} }, {} );
        };

        vm.publish = function(project){
            var newProject = project;
            newProject.visible = !project.visible;
            return addIntProject(newProject)
        };

        vm.deleteProject = function(project){
            return serverActService.deleteProject(project).then(function(){
                $state.reload();
            });
        };

        function  addIntProject(data){
            return serverActService.addIntProject(data).then(function(){
                $state.reload();
            });
        };

    }
})();


