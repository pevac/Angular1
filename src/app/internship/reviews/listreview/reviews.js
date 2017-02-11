(function(){
    angular.module('reviewsModule')
        .controller('reviewCtrl', reviewCtrl);

    reviewCtrl.$inject = ["$scope", "$rootScope", "$state", "serverDataService"];

    function reviewCtrl($scope, $rootScope, $state, serverDataService){
        var vm = this;
        getReviews = function(){
            serverDataService.getReviews().then(function (data) {
                vm.reviews = data;
            });
        };

        vm.setImage = function(review){
            var imageUrl;
          return  serverDataService.getDevImage1(review.img, review.id);
        }

        vm.goToEdit = function(review) {
            $rootScope.review = review;
            $state.go('home.reviews.editreview');
        };


        getReviews();

    }
})();


