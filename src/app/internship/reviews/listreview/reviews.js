(function(){
    angular.module('reviewsModule')
        .controller('reviewController', reviewController);

    reviewController.$inject = ["$scope",  "$state", "serverDataService", "_reviews", "_jobPositions"];

    function reviewController($scope,  $state, serverDataService, _reviews, _jobPositions){
        var vm = this;
        var jobPositions = _jobPositions;
        vm.reviews = _reviews;

        vm.setImage = function(review){
            return  serverDataService.getDevImage1(review.img, review.id);
        };

        vm.setJobPosition = function(review){
            if(!jobPositions && jobPositions.length <= 0) return;
            for(var i = 0; i < jobPositions.length; i++){
                if(jobPositions[i].id == review.jobPosition.id) {
                    return jobPositions[i].name; 
                }
            }
        };

        vm.goToEdit = function(review, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {review: review} }, {} );
        };

    }
})();


