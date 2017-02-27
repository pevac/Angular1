(function(){
    "use strict";

    angular.module("devPortfolioModule").controller("ViewDevPortfolioController", ViewDevPortfolioController);
    ViewDevPortfolioController.$inject = ["$scope", "$state", "serverDataService", "ImageService"];
    
    function ViewDevPortfolioController($scope, $state , serverDataService, ImageService) {
        var vm = this;

        vm.goToEdit = function () {
            $state.go($state.params.previousState.name, {previousState : { name : $state.current.name }, data: {project: vm.project, previewImg: $state.params.data.previewImg, mainImg: $state.params.data.mainImg} }, {} );
        };
        
        activate();
       
        function activate() {
            if($state.params.data && $state.params.data.project){ 
                vm.project = $state.params.data.project;
                setImage();
            }
        }

        function setImage()
        {
            var project = angular.copy(vm.project);
            if($state.params.data && $state.params.data.previewImg){
                vm.image = $state.params.data.previewImg;
                vm.imageUrl = vm.image.data;
            }else{
                serverDataService.getDevImage(project.previewImg,  project.id).then(function(response){
                    vm.image = ImageService.bufferArrayResponceToFile(response, project.previewImg);
                    vm.imageUrl = URL.createObjectURL(vm.image);
                });
            }

        }
    }
})();