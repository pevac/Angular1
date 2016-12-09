    angular.module('addReviewModule',[])
        .controller('addReviewCtrl', addReview);

    function addReview($scope, serverActService){
        $scope.newReview ={
            name:"",
            review: "",
            photo: ""
        }

        $scope.addReview = function () {
            var a = $scope.newReview;
            serverActService.addReview($scope.newReview).then(function (response) {

            });
        }
    }


