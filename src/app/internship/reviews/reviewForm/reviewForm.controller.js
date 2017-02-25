(function(){
 angular.module('reviewsModule',[])
        .controller('addReviewController', addReviewController);

    addReviewController.$inject = ["$scope", "serverActService", "serverDataService", "$state", "_jobPositions", "_projects"]

    function addReviewController($scope,  serverActService,  serverDataService, $state, _jobPositions, _projects){
        var vm = this;
        vm.jobPositions = _jobPositions;
        vm.projects = _projects;
        
        
        vm.addReview = function () {
            vm.dataLoading =true;
            var review = vm.review;
            var imageUrl = vm.croppedDataUrl;
            var photo = vm.photo;

            serverActService.addReview(review).then(function (response) {
                uploadImage(imageUrl, photo, response.data);
            });
        }

        activate();

        function uploadImage(imageUrl, photo, data) {
            var imageBase64 = imageUrl;
            var image = photo;
            
            var base64ImageContent = imageBase64.replace(/^data:image\/(png|jpg);base64,/, "");
            var file = base64ToFile(base64ImageContent, photo);   
          
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
                vm.photo =   ArrayBufferToFile(response, name)
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

        function ArrayBufferToFile(response, name){
            var file;
            var blob;
            var arrayBufferView = new Uint8Array(response.data);
            var type = response.headers('content-type') || 'image/WebP';
            blob = new Blob([arrayBufferView], { type: type });
            blob.name = name;

            return  blob;
        };

        function activate(){
            if(!$state.params.data) return;
            vm.review = $state.params.data.review;
            getReviewImage(vm.review.img, vm.review.id);
        }
       
    }
})();
   

