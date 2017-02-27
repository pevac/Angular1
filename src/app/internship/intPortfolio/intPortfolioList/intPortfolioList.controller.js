(function(){
    "use strict";

    angular.module("intPortfolioModule").controller("IntPortfolioListController", IntPortfolioListController);
    IntPortfolioListController.$inject = ["$scope", "serverActService", "serverDataService", "$state", "projects"];

    function IntPortfolioListController($scope,  serverActService, serverDataService, $state, projects){
        var vm = this;

        vm.projects = projects;

        vm.goToEdit = function(project, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {project: project} }, {} );
        };

        vm.publish = function(project){
            var newProject = project;
            newProject.visible = !project.visible;
            return addIntProject(newProject)
        };

        function  addIntProject(data){
            return serverActService.addIntProject(data).then(function(){
                $state.reload();
            });
        };
    }
})();


