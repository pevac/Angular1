(function(){
    "use strict";

    angular.module("intPortfolioModule").controller("IntPortfolioListController", IntPortfolioListController);
    IntPortfolioListController.$inject = ["$scope", "$state", "projects"];

    function IntPortfolioListController($scope,  $state, projects){
        var vm = this;

        vm.projects = projects;

        vm.goToEdit = function(project, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {project: project} }, {} );
        };

        vm.publish = function(project){
            project.visible = !project.visible;
            updateIntProject(project)
        };

        function  updateIntProject(project){
            project.$update();
        };
    }
})();


