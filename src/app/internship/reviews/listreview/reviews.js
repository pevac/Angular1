(function(){
    angular.module('reviewsModule')
        .controller('reviewCtrl', reviewCtrl);

    reviewCtrl.$inject = ["$scope", "$rootScope", "$state", "serverDataService"];

    function reviewCtrl($scope, $rootScope, $state, serverDataService){
        var vm = this;

        vm.setImage = function(review){
            return  serverDataService.getDevImage1(review.img, review.id);
        };

        vm.setJobPosition = function(review){
            if(vm.jobPositions) return;
            for(var i = 0; i < vm.jobPositions.length; i++){
                if(vm.jobPositions[i].id == review.jobPosition.id) {
                    return vm.jobPositions[i].name; 
                }
            }
        };

        vm.goToEdit = function(review) {
            $rootScope.review = review;
            $state.go('home.reviews.editreview');
        };

        getJobPositions();
        getReviews();

        function getReviews(){
            serverDataService.getReviews().then(function (data) {
                vm.reviews = data;
            });
        };

        function getJobPositions() {
            serverDataService.getJobPositions().then(function (data) {
                vm.jobPositions = data;
            })
        };
    }
})();


