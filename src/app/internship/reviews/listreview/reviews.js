(function(){
    "use strict";
    
    angular.module('reviewsModule').controller('ReviewController', ReviewController);
    ReviewController.$inject = ["$scope",  "$state", "serverDataService", "reviews", "Resources" ];

    function ReviewController($scope,  $state, serverDataService, reviews, Resources){
        var vm = this;
        vm.reviews = reviews;

        vm.setImage = function(review){
            return  Resources.Reviews.getImageUrl(review.img, review.id);
        };

        vm.goToEdit = function(review, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {review: review} }, {} );
        };

    }
})();


