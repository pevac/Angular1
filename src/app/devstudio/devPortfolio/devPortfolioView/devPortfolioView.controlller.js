(function(){
    angular.module('devPortfolioModule')
    .controller('viewDevPortfolioCtrl', viewDevPortfolioCtrl);

    viewDevPortfolioCtrl.$inject = ["$scope","$stateParams", "$rootScope","serverDataService"];
    function viewDevPortfolioCtrl($scope, $stateParams ,$rootScope,  serverDataService) {

        initForm();
       
        function initForm() {
            if(!$rootScope.project){ return; }
            $scope.project = $rootScope.project;
            download();
            $rootScope.project = null;
        }


        function download()
        {
          serverDataService.getDevImage($scope.project.previewImg,  $scope.project.id).then(function(data){
            var arrayBufferView = new Uint8Array( data );
            var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
            
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL( blob );
            
            var img = document.querySelector( "#photo" );
            img.src = imageUrl;
          })
        }
    }
})();