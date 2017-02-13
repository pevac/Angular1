(function(){
    angular.module('devPortfolioModule')
    .controller('viewDevPortfolioCtrl', viewDevPortfolioCtrl);

    viewDevPortfolioCtrl.$inject = ["$scope", "$location",  "$state", "$rootScope","serverDataService"];
    function viewDevPortfolioCtrl($scope, $location, $state ,$rootScope,  serverDataService) {
        var vm = this;

        initForm();
       
        function initForm() {
            vm.project = $rootScope.project;
            vm.photo = $rootScope.previewImg;
            setImage();
        }

        vm.goToEdit = function () {
            if($state.params.previousState.name.indexOf( "list") !== -1){
            $state.go("home.devportfolio.list");
            }else if($state.params.previousState.name.indexOf( "editportfolio") !== -1){
                $rootScope.project = vm.project;
                $rootScope.previewImg = vm.photo;
                $state.go("home.devportfolio.editportfolio");
            }else if($state.params.previousState.name.indexOf( "addportfolio") !== -1){
                $rootScope.project = vm.project;
                $rootScope.previewImg = vm.photo;
                $state.go("home.devportfolio.addportfolio");
            }
        };


        function setImage()
        {
            var project = vm.project;
            if(!vm.photo){
                serverDataService.getDevImage(project.previewImg,  project.id).then(function(response){
                    var arrayBufferView = new Uint8Array(response.data);
                    var type = response.headers('content-type') || 'image/WebP';
                    var blob = new Blob([arrayBufferView], { type: type });
                    var file;
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) { 
                        window.navigator.msSaveOrOpenBlob(blob, project.previewImg); 
                    file = new File([arrayBufferView], project.previewImg, { type: type });
                    }
                    vm.image = file || blob;  
                });
            }else{
                vm.image = vm.photo;
            }

        }
    }
})();