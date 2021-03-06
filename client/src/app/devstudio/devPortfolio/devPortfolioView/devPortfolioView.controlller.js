(function(){
    "use strict";

    angular.module("devPortfolioModule").controller("ViewDevPortfolioController", ViewDevPortfolioController);
    ViewDevPortfolioController.$inject = ["$scope", "$state", "ImageService", "Resources"];
    
    function ViewDevPortfolioController($scope, $state ,  ImageService, Resources) {
        var vm = this;

        vm.goToEdit = function () {
            $state.go($state.params.previousState.name, { data: {project: vm.project, previewImg: $state.params.data.previewImg, mainImg: $state.params.data.mainImg} }, {} );
        };
        
        vm.$onInit = function () {
            activate();
        };
       
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
                Resources.DevProjectFile.getFile( {name: vm.project.previewImg, id: vm.project.id}, 
                    function(response){
                        vm.image = ImageService.bufferArrayResponceToFile(response, vm.project.previewImg);
                        vm.imageUrl = URL.createObjectURL(vm.image);
                    }
                );
            }

        }
    }
})();