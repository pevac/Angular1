(function(){
    angular.module('devPortfolioModule')
    .controller('viewDevPortfolioCtrl', viewDevPortfolioCtrl);

    viewDevPortfolioCtrl.$inject = ["$scope", "$location",  "$stateParams", "$rootScope","serverDataService"];
    function viewDevPortfolioCtrl($scope, $location, $stateParams ,$rootScope,  serverDataService) {
        var vm = this;
        
        initForm();
       
        function initForm() {
            vm.project = $rootScope.project;
            setImage();
            $rootScope.project = null;
        }


        function setImage()
        {
          serverDataService.getDevImage(vm.project.previewImg,  vm.project.id).then(function(data){
            var arrayBufferView = new Uint8Array( data );
            var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
            
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL( blob );
            vm.image = imageUrl;
          });
        }
    }
})();