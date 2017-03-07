(function(){
    "use strict";

    angular.module("intPortfolioModule").controller("IntPortfolioViewController", IntPortfolioViewController);
    IntPortfolioViewController.$inject = ["$scope", "$state", "Resources", "ImageService"];

    function IntPortfolioViewController($scope, $state , Resources, ImageService){
        var vm = this;

        vm.goToEdit = function () {
            $state.go($state.params.previousState.name, { data: {project: vm.project, previewImg: $state.params.data.previewImg} }, {} );
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
            if($state.params.data && $state.params.data.previewImg){
                vm.image = $state.params.data.previewImg;
                vm.imageUrl = vm.image.data;
            }else{
                Resources.IntProjectFile.getFile({name: vm.project.img,  id: vm.project.id},function(response){
                    vm.image = ImageService.bufferArrayResponceToFile(response, vm.project.img);
                    vm.imageUrl = URL.createObjectURL(vm.image);
                });
            }

        }

    }
})();


