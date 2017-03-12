(function(){
    "use strict";

    angular.module("devPortfolioModule").controller("DevPortfolioController", DevPortfolioController);
    DevPortfolioController.$inject = ["$scope", "$state", "projects", "Resources"];

    function DevPortfolioController($scope,  $state, projects, Resources){
        var vm = this;

        vm.projects = projects;

        vm.goToEdit = function(project, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {project: project} }, {} );
        };

        vm.publish = function(project){
            project.visible = !project.visible;
            if(project.visible) { project.inTop = false }
            updateDevProject(project);
        };

        vm.changeTop = function(project){
            Resources.DevProjects.query(function(data){
                sendInTop (data, project);
            });
        };

        function  updateDevProject(project){
            project.$update();
        }

        function sendInTop (data, project){
             var _isCheckTop = isCheckTop(data);
               if(_isCheckTop && project.inTop || project.inTop && !_isCheckTop || !project.inTop && _isCheckTop){
                    project.inTop = !project.inTop;
                    updateDevProject(project);
               }else{
                    // $state.reload();
                    alert("Кількість проектів з зафарбованою зіркою не більше 4");
               }
        }

        function isCheckTop(arg){
            var projects = arg;
            var inTop = true;
            var index=0;
            for(var i = 0; i < projects.length; i++){
                if(projects[i].visible  && projects[i].inTop) {
                    index++;
                }
                if(index >= 4){
                    inTop = false;
                    return inTop;
                }
            }
            return inTop;
        }

    }
})();

