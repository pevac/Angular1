(function(){
    "use strict";
    
    angular.module('reviewsModule').controller('ReviewController', ReviewController);
    ReviewController.$inject = ["$scope",  "$state", "serverDataService", "reviews"];

    function ReviewController($scope,  $state, serverDataService, reviews){
        var vm = this;
        vm.reviews = reviews;

        vm.setImage = function(review){
            return  serverDataService.getDevImage1(review.img, review.id);
        };

        vm.goToEdit = function(review, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {review: review} }, {} );
        };

    }
})();


