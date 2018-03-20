(function(){
    "use strict";
    
    angular.module("reviewsModule").controller("ReviewListController", ReviewListController);
    ReviewListController.$inject = ["$scope",  "$state", "Resources" ];

    function ReviewListController($scope,  $state,  Resources){
        var vm = this;
        
        vm.setImage = function(review){
            return  Resources.ReviewImageURl(review.img, review.id);
        };

        vm.publish = function(review){
            review.visible = !review.visible;
            updateReview(review)
        };

        function  updateReview(review){
            review.$update();
        }

        vm.deleteReview = function(review, index){
            var checkDelete = confirm("Видалити вакансії");

            if(!checkDelete) {
                return;
            }
            review.$remove(function(){
                vm.reviews.splice(index, 1);
            })
        };

        vm.goToEdit = function(review, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {review: review} }, {} );
        };

    }
})();


