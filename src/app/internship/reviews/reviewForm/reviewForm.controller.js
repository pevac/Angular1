(function(){
    "use strict";

    angular.module("reviewsModule").controller("AddReviewController", AddReviewController);
    AddReviewController.$inject = ["$scope", "serverActService", "serverDataService", "$state", "jobPositions", "projects", "ImageService"];

    function AddReviewController($scope,  serverActService,  serverDataService, $state, jobPositions, projects, ImageService){
        var vm = this;
        vm.jobPositions = jobPositions;
        vm.projects = projects;
        activate();
        
        vm.addReview = function () {
            vm.dataLoading =true;
            var review = vm.review;
            var imageUrl = vm.croppedDataUrl;
            var photo = vm.photo;

            serverActService.addReview(review).then(function (response) {
                uploadImage(imageUrl, photo, response.data);
            });
        }

        function uploadImage(imageUrl, photo, data) {
            var imageBase64 = imageUrl;
            var image = photo;
            
            var file = ImageService.base64ToFile(imageBase64, photo);   
          
            serverActService.addReviewImage(file, data.id).then(function (response) {
               var  review  = data;
               review.img = file.name;
                serverActService.addReview(review).then(function (response) {
                    vm.dataLoading =false;
                    $state.go("home.reviews.list");
            })
            }, function(data){
                console.log(data);
            });
        }

        function getReviewImage(name, id) {
            serverDataService.getReviewImage(name, id).then(function (response) {
                vm.photo =   ImageService.bufferArrayResponceToFile(response, name)
            })
        }; 
        
        function activate(){
            if(!$state.params.data) return;
            vm.review = $state.params.data.review;
            getReviewImage(vm.review.img, vm.review.id);
        }
       
    }
})();
   

