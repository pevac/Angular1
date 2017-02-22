(function(){
    angular.module('devPortfolioModule')
    .controller('viewDevPortfolioCtrl', viewDevPortfolioCtrl);

    viewDevPortfolioCtrl.$inject = ["$scope", "$location",  "$state", "$rootScope","serverDataService"];
    function viewDevPortfolioCtrl($scope, $location, $state ,$rootScope,  serverDataService) {
        var vm = this;

        vm.goToEdit = function () {
            if($state.params.previousState.name.indexOf( "list") !== -1){
            $state.go("home.devportfolio.list");
            }else if($state.params.previousState.name.indexOf( "editportfolio") !== -1){
                $state.go("home.devportfolio.editportfolio", { previousState : { name : $state.current.name }, data: {project: vm.project, previewImg: vm.image, mainImg: $state.params.data.mainImg} }, {} );
            }
        };
        
        initForm();
       
        function initForm() {
            if($state.params.data && $state.params.data.project){ 
                vm.project = $state.params.data.project;
                setImage();
            }
            
        }

        function setImage()
        {
            var project = vm.project;
            if($state.params.data && $state.params.data.previewImg){
                vm.image = $state.params.data.previewImg;
                vm.imageUrl = URL.createObjectURL(vm.image);
            }else{
                serverDataService.getDevImage(project.previewImg,  project.id).then(function(response){
                    var arrayBufferView = new Uint8Array(response.data);
                    var type = response.headers('content-type') || 'image/WebP';
                    var blob = new Blob([arrayBufferView], { type: type });
                    blob.name = project.previewImg;
                    vm.image = blob;
                    vm.imageUrl = URL.createObjectURL(vm.image);
                });
            }

        }
    }
})();