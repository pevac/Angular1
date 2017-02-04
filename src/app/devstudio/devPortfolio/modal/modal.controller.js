(function(){
    angular.module('devPortfolioModule').controller('ModalInstanceCtrl', ModalInstanceCtrl);
    ModalInstanceCtrl.$inject = ["$scope", "$uibModalInstance"];

    function ModalInstanceCtrl($scope, $uibModalInstance){
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();



