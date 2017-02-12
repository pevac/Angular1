(function(){
 angular.module('reviewsModule',[])
        .controller('addReviewCtrl', addReviewCtrl);

    addReviewCtrl.$inject = ["$scope", "$rootScope", "serverActService", "serverDataService", "$state"]

    function addReviewCtrl($scope, $rootScope, serverActService,  serverDataService, $state){
        var vm = this;

        vm.addReview = function () {
            var review = vm.review;
            var imageUrl = vm.croppedDataUrl;
            var photo = vm.photo;

            serverActService.addReview(review).then(function (response) {
                uploadImage(imageUrl, photo, response.data);
            });
        }

        function uploadImage(imageUrl, photo, imageId) {
            var data = imageId;
            var imageBase64 = imageUrl;
            var image = photo;
            
            var base64ImageContent = imageBase64.replace(/^data:image\/(png|jpg);base64,/, "");
            var file = base64ToFile(base64ImageContent, photo);   
          
            serverActService.addDevImage(file, data).then(function (response) {
               var  review  = data;
               review.img = file.name;
                serverActService.addReview(review).then(function (response) {
                    $state.go("home.reviews.list");
                })


               
            }, function(data){
                console.log(data);
            });
        }

        function getJobPositions() {
            serverDataService.getJobPositions().then(function (data) {
                vm.jobPositions = data;
            })
        };

        function getDevProjects() {
            serverDataService.getDevProjects().then(function (data) {
               vm.projects = data;
            })
        }; 
        
        function base64ToFile(base64, photo){
            var mime = photo.type || '';
            var sliceSize = photo.size || 1024;
            var byteChars = window.atob(base64);
            var byteArrays = [];

            for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
                var slice = byteChars.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                     byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            var file = new File(byteArrays, photo.name, {type:mime});
                
            return file;
        }

        function initReview(){
            if(!$rootScope.review ) return;
            vm.review = $rootScope.review;
            console.log($rootScope.review);
        }
       


        initReview();
        getJobPositions();
        getDevProjects();
    }
})();
   

