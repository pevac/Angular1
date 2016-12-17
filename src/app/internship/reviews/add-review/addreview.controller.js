(function(){
 angular.module('reviewsModule',[])
        .controller('addReviewCtrl', addReviewCtrl);

    function addReviewCtrl($scope, serverActService, serverDataService){

        $scope.addReview = function () {
            var a = $scope.newReview;
            serverActService.addReview($scope.review).then(function (response) {});
        }

        $scope.getJobPositions = function () {
            serverDataService.getJobPositions().then(function (data) {
                $scope.jobPositions = data;
            })
        };

        $scope.getDevProjects = function () {
            serverDataService.getDevProjects().then(function (data) {
                $scope.projects = data;
            })
        };

        (function(){
            $scope.getJobPositions();
            $scope.getDevProjects();
        })();
    }
})();
   

