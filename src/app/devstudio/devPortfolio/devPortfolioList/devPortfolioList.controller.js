(function(){
    "use strict";

    angular.module("devPortfolioModule").controller("DevPortfolioController", DevPortfolioController);
    DevPortfolioController.$inject = ["$scope", "serverActService", "serverDataService", "$state", "projects"];

    function DevPortfolioController($scope,  serverActService, serverDataService, $state, projects){
        var vm = this;

        vm.projects = projects;

        vm.goToEdit = function(project, stateToGo) {
            var project1 = angular.copy(project);
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {project: project1} }, {} );
        };

        vm.publish = function(project){
            var newProject = project;
            newProject.visible = !project.visible;
            if(newProject.visible) { newProject.inTop = false }
            return addDevProject(newProject)
        };

        vm.changeTop = function(project){
            return serverDataService.getDevProjects().then(function(data){
                sendInTop (data, project);
            });
        };

        function sendInTop (data, project){
             var _isCheckTop = isCheckTop(data);
               if(_isCheckTop && project.inTop || project.inTop && !_isCheckTop || !project.inTop && _isCheckTop){
                    var newProject = project;
                    newProject.inTop = !newProject.inTop;
                    addDevProject(project);
               }else{
                    alert("Кількість проектів з зафарбованою зіркою не більше 4");
               }
        };

        function  addDevProject(data){
            return serverActService.addDevProject(data).then(function(){
                $state.reload();
            });
        };

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
                }
            }

            return inTop;
        }

    }
})();

