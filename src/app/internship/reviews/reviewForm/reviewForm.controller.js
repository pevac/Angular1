(function(){
    "use strict";

    angular.module("reviewsModule").controller("AddReviewController", AddReviewController);
    AddReviewController.$inject = ["$scope", "$state", "jobPositions", "ImageService", "Resources"];

    function AddReviewController($scope,  $state, jobPositions,  ImageService, Resources){
        var vm = this;
        vm.jobPositions = jobPositions;
        activate();
        
        vm.addReview = function (visible) {
            vm.dataLoading =true;
            vm.review.visible = visible;
            var imageUrl = vm.croppedDataUrl;
            var photo = vm.photo;

            saveReview(function (response) {
                uploadImage(imageUrl, photo, response);
            });
        };

        vm.goToEdit = function () {
            var file = ImageService.base64ToFile(vm.croppedDataUrl, vm.photo);   
            
           ImageService.fileToObject(file).then(function(data){
                $state.go( "home.reviews.view", { previousState : { name : $state.current.name }, data: {review: vm.review, previewImg: data} }, {} );
           });
        };

        function saveReview(succesHandler){
            var action = vm.review.id ? "$update": "$save";
            vm.review[action](function(data){succesHandler(data)});
        }


        function uploadImage(imageUrl, photo, review) {
            var imageBase64 = imageUrl;
            vm.review.id  = review.id;
            var file = ImageService.base64ToFile(imageBase64, photo);   
          
            Resources.ReviewFile.saveFile({data: file, id: vm.review.id },function () {
                vm.review.img = file.name;
                saveReview(function () {
                    vm.dataLoading =false;
                    $state.go("home.reviews.list");
                });
            });
        }

        function getReviewImage() {
            Resources.ReviewFile.getFile({name: vm.review.img, id:  vm.review.id},function (response) {
                vm.photo =   ImageService.bufferArrayResponceToFile(response, vm.review.img)
            })
        }
        
        function activate(){
            vm.review = new  Resources.Reviews();
            if(!$state.params.data) return;
            vm.review = $state.params.data.review;
            vm.photo =  $state.params.data.previewImg ? ImageService.base64ToFile($state.params.data.previewImg.data, $state.params.data.previewImg) : null;

            if(!vm.photo) getReviewImage();
        }
       
    }
})();
   

