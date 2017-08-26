(function(){
    "use strict";

    angular.module("intPortfolioModule").controller("ReviewController", ReviewController);
    ReviewController.$inject = ["$scope", "$state", "Resources", "ImageService"];

    function ReviewController($scope, $state , Resources, ImageService){
        var vm = this;

        vm.$onInit = function () {
            activate();
        };

        vm.goToEdit = function () {
            $state.go($state.params.previousState.name, { data: {review: vm.review, previewImg: $state.params.data.previewImg} }, {} );
        };

        function activate() {
            if($state.params.data && $state.params.data.review){ 
                vm.review = $state.params.data.review;
                setImage();
            }
        }

        function setImage() {
            if($state.params.data && $state.params.data.previewImg){
                vm.image = $state.params.data.previewImg;
                vm.imageUrl = vm.image.data;
            }else{
                Resources.ReviewFile.getFile({name: vm.review.img,  id: vm.review.id},function(response){
                    vm.image = ImageService.bufferArrayResponceToFile(response, vm.review.img);
                    vm.imageUrl = URL.createObjectURL(vm.image);
                });
            }
        }
    }
})();
