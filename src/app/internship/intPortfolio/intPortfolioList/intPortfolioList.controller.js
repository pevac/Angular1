(function(){
    "use strict";

    angular.module("intPortfolioModule").controller("IntPortfolioListController", IntPortfolioListController);
    IntPortfolioListController.$inject = ["$scope", "$state"];

    function IntPortfolioListController($scope,  $state){
        var vm = this;

        vm.goToEdit = function(project, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {project: project} }, {} );
        };

        vm.publish = function(project){
            project.visible = !project.visible;
            updateIntProject(project)
        };

        function  updateIntProject(project){
            project.$update();
        }
        
    }
})();


