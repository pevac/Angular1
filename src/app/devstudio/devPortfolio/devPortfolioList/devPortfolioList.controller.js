(function(){
    angular.module('devPortfolioModule',[])
        .controller('devPortfolioListCtrl', devPortfolioListCtrl);

    devPortfolioListCtrl.$inject = ["$scope", "serverActService", "serverDataService", "$state"];
    function devPortfolioListCtrl($scope,   serverActService, serverDataService, $state){
        var vm = this;
        
        vm.goToEdit = function(project, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {project: project} }, {} );
        };

        vm.publish = function(project){
            var newProject = project;
            newProject.draft = !project.draft;
            if(newProject.draft) { newProject.inTop = false }
            addDevProject(newProject)
        };

        vm.deleteProject = function(project){
            serverActService.deleteProject(project).then(function (response) {
                  alert("ahueno");
            });
        };

        vm.changeTop = function(project){
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

        getProjects();

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
                }
            }

            return inTop;
        }

        function getProjects(){
            serverDataService.getDevProjects().then(function (data) {
                vm.projects = data;
            });
        };


    }
})();

