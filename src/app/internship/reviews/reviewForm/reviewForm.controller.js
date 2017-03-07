(function(){
    "use strict";

    angular.module("reviewsModule").controller("AddReviewController", AddReviewController);
    AddReviewController.$inject = ["$scope", "$state", "jobPositions", "ImageService", "Resources"];

    function AddReviewController($scope,  $state, jobPositions,  ImageService, Resources){
        var vm = this;
        vm.jobPositions = jobPositions;
        activate();
        
        vm.addReview = function () {
            vm.dataLoading =true;
            var imageUrl = vm.croppedDataUrl;
            var photo = vm.photo;

            saveReview(function (response) {
                uploadImage(imageUrl, photo, response);
            });
        };

        function saveReview(succesHandler){
            var action = vm.review.id ? "$update": "$save";
            vm.review[action](function(data){succesHandler(data)});
        }


        function uploadImage(imageUrl, photo, review) {
            var imageBase64 = imageUrl;
            var image = photo;
            vm.review.id  = review.id;
            var file = ImageService.base64ToFile(imageBase64, photo);   
          
            Resources.ReviewFile.saveFile({data: file, id: vm.review.id },function () {
                vm.review.img = file.name;
                saveReview(function () {
                    vm.dataLoading =false;
                    $state.go("home.reviews.list");
                })
            });
        }

        function getReviewImage() {
            Resources.ReviewFile.getFile({name: vm.review.img, id:  vm.review.id},function (response) {
                vm.photo =   ImageService.bufferArrayResponceToFile(response, vm.review.img)
            })
        }; 
        
        function activate(){
            vm.review = new  Resources.Reviews();
            if(!$state.params.data) return;
            vm.review = $state.params.data.review;
            getReviewImage();
        }
       
    }
})();
   

